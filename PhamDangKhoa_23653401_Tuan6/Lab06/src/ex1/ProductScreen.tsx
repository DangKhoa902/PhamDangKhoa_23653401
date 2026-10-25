import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { SelectPhoneParamList } from "./SelectPhoneApp";
import { Phone } from "../types";
import { PHONE_COLORS, PHONE_IMAGE_RATIO } from "../data/phones";
import { Stars } from "../components/Stars";
import { colors, formatPrice, shadow } from "../theme";

// Props = props điều hướng của màn "Product" + sản phẩm cần hiển thị
type Props = NativeStackScreenProps<SelectPhoneParamList, "Product"> & { phone: Phone };

// Màn thông tin sản phẩm — Screen 01 (chưa chọn màu) và Screen 04 (đã chọn màu)
// Kích thước/khoảng cách đo từ Figma, khung thiết kế 360 × 640 dp
export function ProductScreen({ navigation, route, phone }: Props) {
  // Màu người dùng đã chọn, nhận lại từ màn ChooseColor (undefined nếu chưa chọn)
  const picked = route.params?.color;
  // Màu đang hiển thị: màu đã chọn, nếu chưa có thì dùng màu mặc định của sản phẩm
  const shown = picked ?? phone.defaultColor;

  return (
    <SafeAreaView style={styles.root}>
      {/* Ảnh điện thoại lớn theo màu đang hiển thị (flex:1 → chiếm phần trống còn lại) */}
      <View style={styles.imageWrap}>
        <Image source={PHONE_COLORS[shown].image} style={styles.image} resizeMode="contain" />
      </View>

      <View style={styles.info}>
        {/* Tên sản phẩm */}
        <Text style={styles.name}>{phone.name}</Text>
        {/* Sao đánh giá + số lượt đánh giá */}
        <View style={[styles.row, styles.starsRow]}>
          <Stars value={phone.rating} size={24} gap={2} />
          <Text style={styles.review}>(Xem {phone.reviewCount} đánh giá)</Text>
        </View>
        {/* Giá bán + giá cũ (gạch ngang) */}
        <View style={[styles.row, styles.priceRow]}>
          <Text style={styles.price}>{formatPrice(phone.price)}</Text>
          <Text style={styles.oldPrice}>{formatPrice(phone.oldPrice)}</Text>
        </View>
        {/* Huy hiệu khuyến mãi + vòng tròn có dấu "?" */}
        <View style={[styles.row, styles.badgeRow]}>
          <Text style={styles.badge}>{phone.badge}</Text>
          <View style={styles.help}>
            <Text style={styles.helpText}>?</Text>
          </View>
        </View>

        {/* TODO 1: nút chọn màu — viền xám, bo góc.
            Chưa chọn màu → "4 MÀU-CHỌN MÀU"; đã chọn → "4 MÀU-CHỌN LOẠI".
            Bấm → sang màn ChooseColor, gửi kèm màu hiện tại để màn đó đánh dấu sẵn */}
        <Pressable
          style={styles.chooseBtn}
          onPress={() => navigation.navigate("ChooseColor", { color: picked })}
        >
          <Text style={styles.chooseText}>{picked ? "4 MÀU-CHỌN LOẠI" : "4 MÀU-CHỌN MÀU"}</Text>
          {/* Dấu ">" nằm sát lề phải nhờ position:absolute */}
          <Text style={styles.chevron}>{">"}</Text>
        </Pressable>
      </View>

      {/* TODO 2: nút "CHỌN MUA" — đặt ngoài khối info nên luôn nằm sát đáy
          (root là flex column, imageWrap flex:1 đẩy phần còn lại xuống dưới) */}
      <Pressable style={styles.buyBtn}>
        <Text style={styles.buyText}>CHỌN MUA</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#fff", paddingHorizontal: 20 }, // flex column toàn màn hình, lề 2 bên 20
  imageWrap: { flex: 1, alignItems: "center", justifyContent: "center", paddingTop: 12 }, // giãn ra lấp chỗ trống
  // Ảnh lấp vùng chứa, cao tối đa 330 và rộng tối đa 330 × tỉ lệ ảnh (≈ 265) như Figma;
  // resizeMode="contain" giữ đúng tỉ lệ, màn thấp hơn thì ảnh tự co lại
  image: { flex: 1, width: "100%", maxHeight: 330, maxWidth: 330 * PHONE_IMAGE_RATIO },
  info: { marginTop: 14, paddingHorizontal: 3 },
  name: { fontSize: 15, lineHeight: 18, color: colors.black },
  row: { flexDirection: "row", alignItems: "center" }, // các phần tử nằm ngang
  starsRow: { marginTop: 8 },
  review: { marginLeft: 22, fontSize: 15, color: colors.black },
  priceRow: { marginTop: 8 },
  price: { fontSize: 18, fontWeight: "700", color: colors.black }, // giá bán: đen, đậm
  oldPrice: { marginLeft: 34, fontSize: 15, color: colors.oldPrice, textDecorationLine: "line-through" }, // gạch ngang
  badgeRow: { marginTop: 10 },
  badge: { fontSize: 12, fontWeight: "700", color: colors.badgeRed },
  help: {
    marginLeft: 10, width: 20, height: 20, borderRadius: 10, // vòng tròn nhỏ
    borderWidth: 1.5, borderColor: colors.black, alignItems: "center", justifyContent: "center",
  },
  helpText: { fontSize: 12, fontWeight: "700", color: colors.black },
  chooseBtn: {
    marginTop: 18, height: 34, borderWidth: 1, borderColor: "rgba(0,0,0,0.46)", // viền xám
    borderRadius: 10, alignItems: "center", justifyContent: "center", backgroundColor: "#fff", ...shadow,
  },
  chooseText: { fontSize: 15, color: colors.black },
  chevron: { position: "absolute", right: 14, fontSize: 20, color: colors.black }, // sát lề phải
  buyBtn: {
    marginTop: 50, marginBottom: 13, height: 44, backgroundColor: colors.red, // sát đáy
    borderRadius: 10, alignItems: "center", justifyContent: "center", ...shadow,
  },
  buyText: { color: "#fff", fontSize: 20, fontWeight: "700" }, // chữ trắng đậm
});
