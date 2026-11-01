import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Header } from "../components/Header";
import { SearchBar } from "../components/SearchBar";
import { CategoryChips } from "../components/CategoryChips";
import { PriceFilter } from "../components/PriceFilter";
import { BookGrid } from "../components/BookGrid";
import { FloatingCartButton } from "../components/FloatingCartButton";
import { EmptyState } from "../components/EmptyState";
import { LoadingView } from "../components/LoadingView";
import { ErrorView } from "../components/ErrorView";
import { getBooks } from "../services/bookService";
import { getCategories } from "../services/categoryService";
import { getErrorMessage } from "../api/client";
import { useDebounce } from "../hooks/useDebounce";
import { filterBooks, PriceRange } from "../utils/filters";
import { useCart } from "../store/hooks";
import { TabScreenProps } from "../navigation/types";
import { Book, Category } from "../types";
import { colors, radius } from "../theme";

// Sắp xếp theo giá: bấm nút để xoay vòng  mặc định → tăng dần → giảm dần → mặc định
type SortOrder = "asc" | "desc" | null;
const NEXT_SORT: Record<string, SortOrder> = { null: "asc", asc: "desc", desc: null };
const SORT_LABEL: Record<string, string> = { null: "⇅ Sắp xếp giá", asc: "↑ Giá tăng dần", desc: "↓ Giá giảm dần" };

export function HomeScreen({ navigation, route }: TabScreenProps<"Home">) {
  const { totalQuantity } = useCart();

  // ---- Dữ liệu từ API ----
  const [books, setBooks] = useState<Book[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // Hai API độc lập → gọi song song
      const [b, c] = await Promise.all([getBooks(), getCategories()]);
      setBooks(b);
      setCategories(c);
    } catch (e) {
      setError(getErrorMessage(e));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  // ---- Tìm kiếm & bộ lọc ----
  const [searchOpen, setSearchOpen] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [priceRange, setPriceRange] = useState<PriceRange>(null);

  const [sortOrder, setSortOrder] = useState<SortOrder>(null);

  const debouncedKeyword = useDebounce(keyword, 400);
  const visibleBooks = useMemo(() => {
    const filtered = filterBooks(books, { keyword: debouncedKeyword, categoryId, priceRange });
    if (sortOrder === null) return filtered;
    // Sắp xếp trên bản sao — không làm đổi mảng gốc
    return [...filtered].sort((a, b) => (sortOrder === "asc" ? a.price - b.price : b.price - a.price));
  }, [books, debouncedKeyword, categoryId, priceRange, sortOrder]);

  const hasFilter = keyword !== "" || categoryId !== null || priceRange !== null;
  const clearFilters = () => {
    setKeyword("");
    setCategoryId(null);
    setPriceRange(null);
  };

  // Nhận categoryId từ tab Danh mục, áp dụng xong thì xoá params để lần sau không bị áp dụng lại
  const paramCategoryId = route.params?.categoryId;
  useEffect(() => {
    if (paramCategoryId !== undefined) {
      setCategoryId(paramCategoryId);
      navigation.setParams({ categoryId: undefined });
    }
  }, [paramCategoryId, navigation]);

  const renderBody = () => {
    if (loading) return <LoadingView label="Đang tải sách…" />;
    if (error) return <ErrorView message={error} onRetry={load} />;
    return (
      <BookGrid
        data={visibleBooks}
        onPressBook={(b) => navigation.navigate("BookDetail", { bookId: b.id })}
        ListHeaderComponent={
          <View>
            <CategoryChips categories={categories} selectedId={categoryId} onSelect={setCategoryId} />
            <PriceFilter value={priceRange} onChange={setPriceRange} />
            <View style={styles.toolbar}>
              <Pressable style={styles.chipBtn} onPress={() => setSortOrder(NEXT_SORT[String(sortOrder)])}>
                <Text style={styles.chipText}>{SORT_LABEL[String(sortOrder)]}</Text>
              </Pressable>
              {hasFilter && (
                <Pressable style={styles.chipBtn} onPress={clearFilters}>
                  <Text style={styles.chipText}>✕ Xóa bộ lọc</Text>
                </Pressable>
              )}
            </View>
          </View>
        }
        ListEmptyComponent={
          <EmptyState
            emoji="🔎"
            title="Không tìm thấy sách phù hợp"
            message="Hãy thử từ khoá khác hoặc bỏ bớt bộ lọc."
            actionLabel="Xóa bộ lọc"
            onAction={clearFilters}
          />
        }
      />
    );
  };

  return (
    <View style={styles.container}>
      <Header title="📚 BookStore" onSearchPress={() => setSearchOpen((v) => !v)} />
      {searchOpen && (
        <SearchBar
          value={keyword}
          onChangeText={setKeyword}
          onClose={() => {
            setSearchOpen(false);
            setKeyword("");
          }}
        />
      )}
      {renderBody()}
      <FloatingCartButton count={totalQuantity} onPress={() => navigation.navigate("Cart")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  toolbar: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginHorizontal: 10, marginBottom: 6 },
  chipBtn: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: radius.md, backgroundColor: "#fff", borderWidth: 1, borderColor: colors.line },
  chipText: { color: colors.indigo, fontWeight: "700" },
});
