
import React from "react";
import {
  View,
  ScrollView,
  Text,
  Pressable,
  StyleSheet,
} from "react-native";

import { CartLineItem } from "../components/CartLineItem";
import type { CartItem } from "../data";

type CartScreenProps = {
  items: CartItem[];
  onCheckout?: () => void;
};

export function CartScreen({
  items,
  onCheckout,
}: CartScreenProps) {

  // Tính tổng tiền từ tất cả sản phẩm
  const total = items.reduce(
    (sum, item) =>
      sum + item.book.price * item.quantity,
    0
  );

  // Định dạng tiền tệ
  const formattedTotal =
    total.toLocaleString("vi-VN") + " đ";

  return (
    <View style={styles.screen}>

      {/* VÙNG 1: Header cố định */}
      <Text style={styles.header}>
        Giỏ hàng
      </Text>

      {/* VÙNG 2: Danh sách cuộn được */}
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {items.length === 0 ? (
          <Text style={styles.emptyText}>
            Giỏ hàng của bạn đang trống.
          </Text>
        ) : (
          items.map((item) => (
            <CartLineItem
              key={item.book.id}
              item={item}
            />
          ))
        )}
      </ScrollView>

      {/* VÙNG 3: Thanh tổng tiền cố định
          Không sử dụng marginBottom vì App.tsx
          đã dành không gian cho TabBar. */}
      <View style={styles.totalBar}>
        <View style={styles.totalInfo}>
          <Text style={styles.totalLabel}>
            Tổng cộng
          </Text>

          <Text style={styles.totalValue}>
            {formattedTotal}
          </Text>
        </View>

        <Pressable
          style={({ pressed }) => [
            styles.checkoutButton,
            pressed && styles.buttonPressed,
            items.length === 0 && styles.buttonDisabled,
          ]}
          disabled={items.length === 0 || !onCheckout}
          onPress={onCheckout}
          accessibilityRole="button"
        >
          <Text style={styles.checkoutText}>
            Thanh toán
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  header: {
    fontSize: 18,
    fontWeight: "800",
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },

  // Chiếm phần không gian giữa Header và totalBar
  scroll: {
    flex: 1,
  },

  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    flexGrow: 1,
  },

  emptyText: {
    textAlign: "center",
    marginTop: 40,
    color: "#9CA3AF",
  },

  // Thanh tổng tiền không nằm trong ScrollView
  totalBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    paddingHorizontal: 16,
    paddingVertical: 14,

    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    backgroundColor: "#FFFFFF",
  },

  totalInfo: {
    flex: 1,
    marginRight: 12,
  },

  totalLabel: {
    fontSize: 12,
    color: "#5B6B7F",
  },

  totalValue: {
    fontSize: 18,
    fontWeight: "800",
    color: "#1E1B4B",
  },

  checkoutButton: {
    backgroundColor: "#4338CA",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 10,
  },

  buttonPressed: {
    opacity: 0.7,
  },

  buttonDisabled: {
    opacity: 0.5,
  },

  checkoutText: {
    color: "#FFFFFF",
    fontWeight: "700",
  },
});
