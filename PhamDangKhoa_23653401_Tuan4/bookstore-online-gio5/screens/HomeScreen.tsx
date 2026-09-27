
import React from "react";
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  SafeAreaView,
} from "react-native";

import { Header } from "../components/Header";
import { CategoryChips } from "../components/CategoryChips";
import { BookGrid } from "../components/BookGrid";
import { FloatingCartButton } from "../components/FloatingCartButton";
import { BOOKS } from "../data";

type HomeScreenProps = {
  cartCount: number;
  onPressBook: (id: number) => void;
  onPressCart: () => void;
};

export function HomeScreen({
  cartCount,
  onPressBook,
  onPressCart,
}: HomeScreenProps) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.screen}>
        {/* 1. Header cố định */}
        <Header />

        {/* 2. Nội dung có thể cuộn */}
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.sectionTitle}>
            Danh mục
          </Text>

          <CategoryChips />

          <Text style={styles.sectionTitle}>
            Sách nổi bật
          </Text>

          <BookGrid
            books={BOOKS}
            onPressBook={onPressBook}
          />
        </ScrollView>

        {/* 3. Nút giỏ hàng cố định */}
        <FloatingCartButton
          count={cartCount}
          onPress={onPressCart}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },

  screen: {
    flex: 1,
    position: "relative",
    backgroundColor: "#F8FAFC",
  },

  scroll: {
    flex: 1,
  },

  scrollContent: {
    padding: 16,
    paddingBottom: 140,
  },

  sectionTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 10,
    marginTop: 4,
  },
});
