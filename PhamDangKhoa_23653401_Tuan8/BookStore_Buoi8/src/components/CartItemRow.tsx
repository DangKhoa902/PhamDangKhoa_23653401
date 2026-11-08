import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useDebounce } from "../hooks/useDebounce";
import { CartItem } from "../types";
import { colors, formatPrice, radius } from "../theme";

interface Props {
  item: CartItem;
  onChangeQty: (bookId: number, quantity: number) => void;
  onRemove: (bookId: number) => void;
}

// BT8.6: nút −/+ với STATE CỤC BỘ + debounce 300ms
//   - qty (cục bộ) đổi ngay khi bấm → nút phản hồi tức thì
//   - debouncedQty chỉ đổi sau khi ngừng bấm 300ms → lúc đó mới ghi lên store (1 lần)
export function CartItemRow({ item, onChangeQty, onRemove }: Props) {
  const [qty, setQty] = useState(item.quantity);
  const debouncedQty = useDebounce(qty, 300);

  // Ngừng bấm 300ms → đẩy số lượng mới lên store (nếu thực sự khác)
  useEffect(() => {
    if (debouncedQty !== item.quantity) onChangeQty(item.bookId, debouncedQty);
    // Cố ý chỉ phụ thuộc debouncedQty: nếu thêm item.quantity, khi store đổi từ nơi khác
    // effect sẽ chạy với debouncedQty cũ và ghi đè giá trị cũ ngược lên store.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedQty]);

  // Store đổi từ nơi khác (nạp lại từ AsyncStorage, thêm sách từ trang chi tiết…) → đồng bộ lại state cục bộ
  useEffect(() => {
    setQty(item.quantity);
  }, [item.quantity]);

  const canDec = qty > 1;
  const canInc = qty < item.stock; // không vượt tồn kho

  return (
    <View style={styles.row}>
      <View style={[styles.cover, { backgroundColor: item.color }]}>
        <Text style={styles.emoji}>{item.emoji}</Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
        <Text style={styles.price}>{formatPrice(item.price)}</Text>
        <View style={styles.stepper}>
          <Pressable
            disabled={!canDec}
            onPress={() => setQty((q) => Math.max(1, q - 1))}
            style={[styles.stepBtn, !canDec && styles.stepBtnDisabled]}
            hitSlop={6}
            accessibilityRole="button"
            accessibilityLabel="Giảm"
            accessibilityState={{ disabled: !canDec }}
          >
            <Text style={styles.stepText}>−</Text>
          </Pressable>
          <Text style={styles.qty}>{qty}</Text>
          <Pressable
            disabled={!canInc}
            onPress={() => setQty((q) => Math.min(item.stock, q + 1))}
            style={[styles.stepBtn, !canInc && styles.stepBtnDisabled]}
            hitSlop={6}
            accessibilityRole="button"
            accessibilityLabel="Tăng"
            accessibilityState={{ disabled: !canInc }}
          >
            <Text style={styles.stepText}>+</Text>
          </Pressable>
          <Text style={styles.stock}>Còn {item.stock}</Text>
        </View>
      </View>
      <Pressable onPress={() => onRemove(item.bookId)} hitSlop={8} accessibilityLabel="Xóa khỏi giỏ">
        <Text style={styles.trash}>🗑️</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "center", backgroundColor: colors.card, borderRadius: radius.md, padding: 10, marginHorizontal: 12, marginVertical: 5, gap: 10 },
  cover: { width: 54, height: 72, borderRadius: radius.sm, alignItems: "center", justifyContent: "center" },
  emoji: { fontSize: 26 },
  info: { flex: 1, gap: 2 },
  title: { fontWeight: "700", color: colors.text },
  price: { color: colors.indigo, fontWeight: "800" },
  stepper: { flexDirection: "row", alignItems: "center", gap: 10, marginTop: 4 },
  stepBtn: { width: 30, height: 30, borderRadius: 15, borderWidth: 1, borderColor: colors.indigo, alignItems: "center", justifyContent: "center" },
  stepBtnDisabled: { opacity: 0.3 },
  stepText: { color: colors.indigo, fontSize: 18, fontWeight: "800", lineHeight: 20 },
  qty: { fontWeight: "800", color: colors.navy, fontSize: 16, minWidth: 22, textAlign: "center" },
  stock: { color: colors.muted, fontSize: 12 },
  trash: { fontSize: 22 },
});
