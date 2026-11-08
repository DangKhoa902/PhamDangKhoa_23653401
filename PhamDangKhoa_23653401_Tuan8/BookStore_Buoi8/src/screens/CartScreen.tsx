import React, { useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { Header } from "../components/Header";
import { CartItemRow } from "../components/CartItemRow";
import { PrimaryButton } from "../components/PrimaryButton";

import { EmptyState } from "../components/EmptyState";
import { useAuth, useCart } from "../store/hooks";
import { confirmDialog } from "../utils/dialog"; // đã viết sẵn — dùng ở BT8.7a
import { TabScreenProps } from "../navigation/types";
import { colors, formatPrice, radius } from "../theme";

// BT8.C2 (thử thách): mã giảm giá cố định phía client (hệ thống thật phải kiểm tra mã ở server)
const COUPONS: Record<string, { label: string; discount: (subtotal: number) => number }> = {
  SALE10: { label: "Giảm 10%", discount: (s) => Math.round(s * 0.1) },
  GIAM50K: { label: "Giảm 50.000 đ", discount: (s) => Math.min(50000, s) }, // không giảm quá tạm tính
};

export function CartScreen({ navigation }: TabScreenProps<"Cart">) {
  const { items, totalPrice, setQty, remove } = useCart();
  const { isLoggedIn } = useAuth(); // BT8.4

  // BT8.C2: mã giảm giá
  const [couponInput, setCouponInput] = useState("");
  const [coupon, setCoupon] = useState<string | null>(null); // mã đang áp dụng
  const [couponMsg, setCouponMsg] = useState<{ text: string; ok: boolean } | null>(null);

  // Giảm giá tính lại theo tạm tính hiện tại → đổi số lượng thì giảm 10% cũng đổi theo
  const discount = coupon ? COUPONS[coupon].discount(totalPrice) : 0;
  const finalTotal = totalPrice - discount;

  const applyCoupon = () => {
    const code = couponInput.trim().toUpperCase();
    if (!code) {
      setCoupon(null);
      setCouponMsg({ text: "Vui lòng nhập mã giảm giá", ok: false });
    } else if (COUPONS[code]) {
      setCoupon(code);
      setCouponInput(code);
      setCouponMsg({ text: `Đã áp dụng ${code}: ${COUPONS[code].label}`, ok: true });
    } else {
      setCoupon(null);
      setCouponMsg({ text: "Mã giảm giá không hợp lệ", ok: false });
    }
  };

  // BT8.7a: xóa sản phẩm có XÁC NHẬN — confirmDialog chạy được cả web (window.confirm) lẫn điện thoại (Alert.alert)
  const askRemove = (bookId: number) => {
    const item = items.find((i) => i.bookId === bookId);
    confirmDialog("Xóa sản phẩm", `Xóa "${item?.title ?? "sản phẩm"}" khỏi giỏ hàng?`, () => remove(bookId));
  };

  // BT8.4: bảo vệ Checkout — đã đăng nhập thì vào thẳng; chưa thì sang Login kèm "đích đến" + tổng tiền
  const goCheckout = () => {
    if (isLoggedIn) navigation.navigate("Checkout", { total: finalTotal });
    else navigation.navigate("Login", { redirectTo: "Checkout", total: finalTotal });
  };

  return (
    <View style={styles.container}>
      <Header title="🛒 Giỏ hàng" />
      <FlatList
        data={items}
        keyExtractor={(i) => String(i.bookId)}
        renderItem={({ item }) => <CartItemRow item={item} onChangeQty={setQty} onRemove={askRemove} />}
        contentContainerStyle={{ paddingVertical: 8, flexGrow: 1 }}
        ListEmptyComponent={
          <EmptyState emoji="🛒" title="Giỏ hàng trống" message="Hãy chọn vài cuốn sách yêu thích nhé." actionLabel="Khám phá sách" onAction={() => navigation.navigate("Home")} />
        }
      />
      {items.length > 0 && (
        <View style={styles.footer}>
          {/* BT8.C2: ô nhập mã + nút Áp dụng */}
          <View style={styles.couponRow}>
            <TextInput
              style={styles.couponInput}
              value={couponInput}
              onChangeText={setCouponInput}
              onSubmitEditing={applyCoupon}
              placeholder="Mã giảm giá (SALE10, GIAM50K)"
              placeholderTextColor={colors.muted}
              autoCapitalize="characters"
              autoCorrect={false}
              accessibilityLabel="Mã giảm giá"
            />
            <Pressable style={styles.couponBtn} onPress={applyCoupon} accessibilityRole="button">
              <Text style={styles.couponBtnText}>Áp dụng</Text>
            </Pressable>
          </View>
          {couponMsg ? <Text style={couponMsg.ok ? styles.couponOk : styles.couponErr}>{couponMsg.text}</Text> : null}

          <View style={styles.line}><Text style={styles.muted}>Tạm tính</Text><Text style={styles.value}>{formatPrice(totalPrice)}</Text></View>
          <View style={styles.line}>
            <Text style={styles.muted}>Giảm giá{coupon ? ` (${coupon})` : ""}</Text>
            <Text style={[styles.value, discount > 0 && { color: colors.success }]}>{discount > 0 ? `−${formatPrice(discount)}` : formatPrice(0)}</Text>
          </View>
          <View style={styles.line}><Text style={styles.total}>Tổng cộng</Text><Text style={styles.total}>{formatPrice(finalTotal)}</Text></View>
          <PrimaryButton title="Thanh toán" onPress={goCheckout} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  footer: { backgroundColor: "#fff", padding: 14, gap: 8, borderTopWidth: 1, borderTopColor: colors.line },
  line: { flexDirection: "row", justifyContent: "space-between" },
  muted: { color: colors.muted },
  value: { fontWeight: "700", color: colors.text },
  total: { fontSize: 17, fontWeight: "800", color: colors.navy },
  couponRow: { flexDirection: "row", gap: 8 },
  couponInput: { flex: 1, borderWidth: 1, borderColor: colors.line, borderRadius: radius.md, paddingHorizontal: 12, paddingVertical: 8, color: colors.text, backgroundColor: "#fff" },
  couponBtn: { backgroundColor: colors.indigo, borderRadius: radius.md, paddingHorizontal: 16, justifyContent: "center" },
  couponBtnText: { color: "#fff", fontWeight: "800" },
  couponOk: { color: colors.success, fontSize: 12 },
  couponErr: { color: colors.danger, fontSize: 12 },
});
