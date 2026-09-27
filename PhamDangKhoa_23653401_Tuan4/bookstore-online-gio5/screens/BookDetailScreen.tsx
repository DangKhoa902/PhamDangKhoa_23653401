import React from "react";
import {
  View,
  ScrollView,
  Text,
  Image,
  Pressable,
  StyleSheet,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { Book } from "../data";

// Định nghĩa kiểu dữ liệu của các props
type BookDetailScreenProps = {
  book: Book;             // Thông tin cuốn sách
  onBack: () => void;     // Hàm xử lý quay lại
  onAddToCart: () => void; // Hàm thêm sách vào giỏ hàng
};

export function BookDetailScreen({
  book,
  onBack,
  onAddToCart,
}: BookDetailScreenProps) {

  // Định dạng giá tiền theo tiếng Việt
  const formattedPrice =
    book.price.toLocaleString("vi-VN") + " đ";

  return (
    // SafeAreaView giúp nội dung tránh vùng tai thỏ,
    // thanh trạng thái và vùng điều hướng của thiết bị.
    <SafeAreaView
      style={styles.safeArea}
      edges={["top", "bottom", "left", "right"]}
    >
      {/* View chính chứa toàn bộ màn hình */}
      <View style={styles.screen}>

        {/* VÙNG 1: NÚT QUAY LẠI CỐ ĐỊNH
            Nằm ngoài ScrollView nên không cuộn. */}
        <Pressable
          style={styles.backButton}
          onPress={onBack}
          accessibilityRole="button"
          accessibilityLabel="Quay lại"
        >
          <Text style={styles.backText}>
            ← Quay lại
          </Text>
        </Pressable>

        {/* VÙNG 2: NỘI DUNG CUỘN
            flex: 1 giúp chiếm không gian còn lại
            giữa nút quay lại và thanh giỏ hàng. */}
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >

          {/* Ảnh bìa sách
              alignSelf: center căn giữa ảnh.
              aspectRatio: 3/4 giữ nguyên tỉ lệ
              hiển thị khi chiều rộng thay đổi. */}
          <Image
            source={{ uri: book.cover }}
            style={styles.cover}
            resizeMode="cover"
          />

          {/* Tên sách */}
          <Text style={styles.title}>
            {book.title}
          </Text>

          {/* Tên tác giả */}
          <Text style={styles.author}>
            Tác giả: {book.author}
          </Text>

          {/* Giá bán */}
          <Text style={styles.price}>
            {formattedPrice}
          </Text>

          {/* Mô tả sách
              Nằm trong ScrollView nên mô tả dài
              vẫn có thể xem bằng cách cuộn. */}
          <Text style={styles.description}>
            {book.description}
          </Text>
        </ScrollView>

        {/* VÙNG 3: THANH GIỎ HÀNG CỐ ĐỊNH
            Cùng cấp với ScrollView.
            Không cuộn theo phần mô tả sách. */}
        <View style={styles.bottomBar}>

          {/* Giá sách hiển thị bên trái */}
          <Text style={styles.bottomPrice}>
            {formattedPrice}
          </Text>

          {/* Nút thêm vào giỏ hàng bên phải */}
          <Pressable
            style={({ pressed }) => [
              styles.addButton,
              pressed && styles.buttonPressed,
            ]}
            onPress={onAddToCart}
            accessibilityRole="button"
            accessibilityLabel="Thêm sách vào giỏ hàng"
          >
            <Text style={styles.addButtonText}>
              Thêm vào giỏ
            </Text>
          </Pressable>

        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  // SafeAreaView bao phủ toàn bộ màn hình
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  // Container chính
  screen: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  // Nút quay lại nằm ở vùng cố định phía trên
  backButton: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    alignSelf: "flex-start",
  },

  backText: {
    color: "#4338CA",
    fontSize: 16,
    fontWeight: "600",
  },

  // ScrollView chiếm phần không gian còn lại
  scroll: {
    flex: 1,
  },

  // Padding chỉ áp dụng cho nội dung bên trong
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 24,
  },

  // Ảnh bìa sách
  cover: {
    alignSelf: "center",
    width: "70%",
    aspectRatio: 3 / 4,
    borderRadius: 12,
    backgroundColor: "#EEF2F7",
  },

  // Tên sách
  title: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: "800",
    color: "#111827",
  },

  // Tác giả
  author: {
    marginTop: 4,
    fontSize: 14,
    color: "#5B6B7F",
  },

  // Giá tiền phía dưới thông tin sách
  price: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: "700",
    color: "#1E1B4B",
  },

  // Mô tả sách
  description: {
    marginTop: 16,
    fontSize: 14,
    lineHeight: 21,
    color: "#374151",
  },

  // Thanh cố định phía dưới
  bottomBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    paddingHorizontal: 20,
    paddingVertical: 14,

    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    backgroundColor: "#FFFFFF",
  },

  // Giá ở thanh dưới cùng
  bottomPrice: {
    flexShrink: 1,
    marginRight: 12,
    fontSize: 17,
    fontWeight: "800",
    color: "#1E1B4B",
  },

  // Nút thêm vào giỏ
  addButton: {
    backgroundColor: "#4338CA",
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 10,
  },

  // Hiệu ứng khi nhấn nút
  buttonPressed: {
    opacity: 0.7,
  },

  addButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
  },
});
