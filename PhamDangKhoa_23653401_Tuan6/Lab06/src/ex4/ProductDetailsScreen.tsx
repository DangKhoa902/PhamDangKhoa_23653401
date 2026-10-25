import React from "react";
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { PHONES, PHONE_COLORS } from "../data/phones";
import { Stars } from "../components/Stars";
import { colors, formatPrice } from "../theme";
import { useFavorites } from "./FavoritesContext";
import type { RootProps } from "./types";

// Màn chi tiết sản phẩm — nhận id qua route.params
export function ProductDetailsScreen({ route }: RootProps<"ProductDetails">) {
  // TODO 4: lấy id được truyền sang rồi tìm sản phẩm tương ứng
  const { id } = route.params;
  const phone = PHONES.find((p) => p.id === id);
  // Hàm kiểm tra / bật-tắt yêu thích từ Context
  const { has, toggle } = useFavorites();

  // TODO 5: id không tồn tại → báo không tìm thấy
  if (!phone) {
    return (
      <View style={styles.center}>
        <Text style={styles.muted}>Không tìm thấy sản phẩm #{id}</Text>
      </View>
    );
  }

  // Sản phẩm này đã nằm trong danh sách yêu thích chưa
  const saved = has(phone.id);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* TODO 6: ảnh (màu mặc định), tên, sao, giá, nhà cung cấp */}
      <Image source={PHONE_COLORS[phone.defaultColor].image} style={styles.image} resizeMode="contain" />
      <Text style={styles.name}>{phone.name}</Text>
      <View style={styles.row}>
        <Stars value={phone.rating} />
        <Text style={styles.muted}>  ({phone.reviewCount} đánh giá)</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.price}>{formatPrice(phone.price)}</Text>
        {/* Chỉ hiện giá cũ khi có giảm giá */}
        {phone.oldPrice > phone.price && <Text style={styles.oldPrice}>{formatPrice(phone.oldPrice)}</Text>}
      </View>
      <Text style={styles.text}>
        Cung cấp bởi <Text style={styles.bold}>{phone.supplier}</Text>
      </Text>

      {/* TODO 7: nút lưu yêu thích — đổi chữ/màu theo trạng thái, bấm để bật/tắt */}
      <Pressable style={[styles.favBtn, saved && styles.favBtnOn]} onPress={() => toggle(phone.id)}>
        <Text style={[styles.favText, saved && styles.favTextOn]}>{saved ? "♥ Đã lưu" : "♡ Lưu vào yêu thích"}</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: "center", justifyContent: "center" },
  container: { padding: 16, gap: 10, backgroundColor: "#fff", flexGrow: 1 },
  image: { width: "100%", height: 260 },
  name: { fontSize: 18, fontWeight: "700", color: colors.text },
  row: { flexDirection: "row", alignItems: "center" },
  price: { color: colors.red, fontSize: 20, fontWeight: "700" },
  oldPrice: { marginLeft: 16, color: colors.muted, textDecorationLine: "line-through" },
  text: { color: colors.text, fontSize: 15 },
  bold: { fontWeight: "700" },
  muted: { color: colors.muted },
  favBtn: {
    marginTop: 12, height: 44, borderRadius: 6, borderWidth: 1, borderColor: colors.red, // viền đỏ khi chưa lưu
    alignItems: "center", justifyContent: "center",
  },
  favBtnOn: { backgroundColor: colors.red }, // nền đỏ khi đã lưu
  favText: { color: colors.red, fontSize: 16, fontWeight: "700" },
  favTextOn: { color: "#fff" },
});
