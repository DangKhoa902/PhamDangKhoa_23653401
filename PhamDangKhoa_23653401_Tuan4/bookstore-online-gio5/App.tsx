
import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";

import {
  SafeAreaProvider,
  SafeAreaView,
} from "react-native-safe-area-context";

import { StatusBar } from "expo-status-bar";

import { TabBar } from "./components/TabBar";
import type { TabKey } from "./components/TabBar";

import { HomeScreen } from "./screens/HomeScreen";
import { BookDetailScreen } from "./screens/BookDetailScreen";
import { CartScreen } from "./screens/CartScreen";

import { BOOKS, CART_ITEMS } from "./data";

export default function App() {
  // Tab đang được chọn trong thanh điều hướng
  const [activeTab, setActiveTab] =
    useState<TabKey>("home");

  // null: hiển thị màn hình chính của tab.
  // number: đang xem chi tiết cuốn sách tương ứng.
  const [selectedBookId, setSelectedBookId] =
    useState<number | null>(null);

  // Tìm sách theo ID được chọn
  const selectedBook = BOOKS.find(
    (book) => book.id === selectedBookId
  );

  // Nhấn vào sách ở trang chủ
  const handlePressBook = (id: number) => {
    setSelectedBookId(id);
  };

  // Quay lại trang chủ từ chi tiết sách
  const handleBack = () => {
    setSelectedBookId(null);
    setActiveTab("home");
  };

  // Chuyển tab và đóng màn hình chi tiết
  const handleChangeTab = (tab: TabKey) => {
    setSelectedBookId(null);
    setActiveTab(tab);
  };

  // Chọn màn hình hiển thị
  const renderScreen = () => {
    // Ưu tiên hiển thị chi tiết khi có sách được chọn
    if (selectedBookId !== null) {
      return selectedBook ? (
        <BookDetailScreen
          book={selectedBook}
          onBack={handleBack}
          onAddToCart={() => {
            console.log(
              "Thêm vào giỏ:",
              selectedBook.id
            );
          }}
        />
      ) : (
        <Placeholder message="Không tìm thấy sách." />
      );
    }

    // Nếu không xem chi tiết, hiển thị tab đang chọn
    switch (activeTab) {
      case "home":
        return (
          <HomeScreen
            cartCount={CART_ITEMS.length}
            onPressBook={handlePressBook}
            onPressCart={() => handleChangeTab("cart")}
          />
        );

      case "cart":
        return <CartScreen items={CART_ITEMS} />;

      case "category":
        return (
          <Placeholder message="Danh mục sách" />
        );

      case "account":
        return (
          <Placeholder message="Tài khoản" />
        );

      default:
        return null;
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.root}>

        <View style={styles.body}>

          {/* Nội dung thay đổi theo trạng thái */}
          <View style={styles.screenContent}>
            {renderScreen()}
          </View>

          {/* TabBar luôn chỉ có 4 mục */}
          <TabBar
            active={activeTab}
            onChange={handleChangeTab}
          />

        </View>

        <StatusBar style="auto" />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

function Placeholder({
  message,
}: {
  message: string;
}) {
  return (
    <View style={styles.placeholder}>
      <Text>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  body: {
    flex: 1,
    position: "relative",
  },

  // Chừa vị trí cho TabBar absolute cao 64 px
  screenContent: {
    flex: 1,
    paddingBottom: 64,
  },

  placeholder: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
