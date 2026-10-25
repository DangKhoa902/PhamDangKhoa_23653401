import React from "react";
import { FlatList, StyleSheet, Text } from "react-native";
import { PHONES } from "../data/phones";
import { colors } from "../theme";
import { useFavorites } from "./FavoritesContext";
import { ProductRow } from "./ProductRow";
import type { TabProps } from "./types";

// Tab2 — các sản phẩm đã lưu yêu thích
export function FavoritesTab({ navigation }: TabProps<"Favorites">) {
  // TODO 8: lấy danh sách id từ Context rồi lọc ra các sản phẩm tương ứng
  const { ids } = useFavorites();
  const favorites = PHONES.filter((p) => ids.includes(p.id));

  return (
    <FlatList
      data={favorites}
      keyExtractor={(p) => p.id}
      contentContainerStyle={{ padding: 16, gap: 10, flexGrow: 1 }}
      renderItem={({ item }) => (
        // Bấm một dòng cũng mở ProductDetails giống Tab1
        <ProductRow phone={item} onPress={() => navigation.navigate("ProductDetails", { id: item.id })} />
      )}
      // Chưa lưu sản phẩm nào → thông báo
      ListEmptyComponent={<Text style={styles.empty}>Chưa có sản phẩm nào được lưu.</Text>}
    />
  );
}

const styles = StyleSheet.create({
  empty: { textAlign: "center", color: colors.muted, marginTop: 32, fontSize: 15 },
});
