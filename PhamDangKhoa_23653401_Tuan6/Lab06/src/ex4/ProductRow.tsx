import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Phone } from "../types";
import { PHONE_COLORS } from "../data/phones";
import { colors, formatPrice } from "../theme";

// Một dòng sản phẩm trong danh sách (dùng chung cho tab Products và Favorites)
export function ProductRow({ phone, onPress }: { phone: Phone; onPress: () => void }) {
  return (
    // pressed → làm mờ dòng khi đang bấm để có phản hồi thị giác
    <Pressable onPress={onPress} style={({ pressed }) => [styles.row, pressed && { opacity: 0.6 }]}>
      {/* Ảnh nhỏ theo màu mặc định */}
      <Image source={PHONE_COLORS[phone.defaultColor].image} style={styles.thumb} resizeMode="contain" />
      <View style={styles.flex}>
        <Text style={styles.name}>{phone.name.split(" - ")[0]}</Text>
        <Text style={styles.price}>{formatPrice(phone.price)}</Text>
      </View>
      <Text style={styles.chevron}>{">"}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row", alignItems: "center", backgroundColor: "#fff",
    padding: 12, borderRadius: 8, borderWidth: 1, borderColor: colors.line,
  },
  thumb: { width: 40, height: 56, marginRight: 12 },
  flex: { flex: 1 },
  name: { fontSize: 15, color: colors.text, fontWeight: "600" },
  price: { marginTop: 4, color: colors.red, fontWeight: "700" },
  chevron: { color: colors.muted, fontSize: 18 },
});
