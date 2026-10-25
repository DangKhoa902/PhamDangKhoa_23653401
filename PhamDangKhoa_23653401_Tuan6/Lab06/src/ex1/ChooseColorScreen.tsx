import React, { useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { SelectPhoneParamList } from "./SelectPhoneApp";
import { ColorKey, Phone } from "../types";
import { COLOR_ORDER, PHONE_COLORS } from "../data/phones";
import { colors, formatPrice, shadow } from "../theme";

// Props = props điều hướng của màn "ChooseColor" + sản phẩm
type Props = NativeStackScreenProps<SelectPhoneParamList, "ChooseColor"> & { phone: Phone };

// Màn chọn màu — Screen 02 (chưa chọn) và Screen 03 (đã chọn)
// Kích thước/khoảng cách đo từ Figma, khung thiết kế 360 × 640 dp
export function ChooseColorScreen({ navigation, route, phone }: Props) {
  // Màu đang được chọn trên màn này; khởi tạo bằng màu nhận từ màn Product
  const [picked, setPicked] = useState<ColorKey | undefined>(route.params?.color);
  // Tách tên thành 2 dòng: "Điện Thoại Vsmart Joy 3" / "Hàng chính hãng"
  const [line1, line2] = phone.name.split(" - ");

  return (
    // Nền gốc xám để vùng an toàn phía dưới cùng màu với nửa dưới;
    // phần tai thỏ phía trên do header trắng tự phủ (xem headerWrap)
    <SafeAreaView style={styles.root} edges={["bottom"]}>
      {/* ===== Nửa trên: nền trắng, ảnh nhỏ + thông tin ===== */}
      <SafeAreaView edges={["top"]} style={styles.headerWrap}>
        <View style={styles.header}>
          {/* Ảnh nhỏ đổi theo màu đang chọn (chưa chọn → màu mặc định) */}
          <Image
            source={PHONE_COLORS[picked ?? phone.defaultColor].image}
            style={styles.thumb}
            resizeMode="contain"
          />
          <View style={styles.headerText}>
            <Text style={styles.small}>{line1}</Text>
            <Text style={styles.small}>{line2}</Text>

            {/* TODO 3: chỉ khi đã chọn màu mới hiện thêm 3 dòng (dùng && + Fragment) */}
            {picked && (
              <>
                {/* Tên màu in đậm */}
                <Text style={[styles.small, styles.colorLine]}>
                  Màu: <Text style={styles.bold}>{PHONE_COLORS[picked].label}</Text>
                </Text>
                {/* Nhà cung cấp in đậm */}
                <Text style={[styles.small, styles.supplierLine]}>
                  Cung cấp bởi <Text style={styles.bold}>{phone.supplier}</Text>
                </Text>
                {/* Giá, chữ đậm, lớn hơn */}
                <Text style={styles.price}>{formatPrice(phone.price)}</Text>
              </>
            )}
          </View>
        </View>
      </SafeAreaView>

      {/* ===== Nửa dưới: nền xám, 4 ô màu xếp dọc + nút XONG ===== */}
      <View style={styles.body}>
        <Text style={styles.hint}>Chọn một màu bên dưới:</Text>
        <View style={styles.swatches}>
          {/* Mỗi màu là một ô bấm được; ô đang chọn có viền đậm (swatchOn) */}
          {COLOR_ORDER.map((key) => (
            <Pressable
              key={key}
              onPress={() => setPicked(key)}
              style={[styles.swatch, { backgroundColor: PHONE_COLORS[key].hex }, picked === key && styles.swatchOn]}
            />
          ))}
        </View>

        {/* TODO 4: nút "XONG" — gửi màu đã chọn về màn Product.
            merge:true → gộp params mới vào params cũ của Product.
            pop:true   → React Navigation 7: quay lại màn Product có sẵn trong stack
                         thay vì đẩy thêm một màn Product mới. */}
        <Pressable
          style={styles.doneBtn}
          onPress={() => navigation.navigate("Product", { color: picked }, { merge: true, pop: true })}
        >
          <Text style={styles.doneText}>XONG</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.grey },
  headerWrap: { backgroundColor: "#fff" }, // phủ trắng cả vùng tai thỏ phía trên
  header: { flexDirection: "row", height: 149 }, // nửa trên cao 149 như Figma: ảnh trái, chữ phải
  thumb: { marginLeft: 11, marginTop: 6, width: 97, height: 121 }, // ảnh nhỏ 97 × 121
  headerText: { flex: 1, marginLeft: 18, paddingTop: 16 },
  small: { fontSize: 15, lineHeight: 19, color: colors.black },
  colorLine: { marginTop: 7 },
  supplierLine: { marginTop: 8 },
  bold: { fontWeight: "700" },
  price: { marginTop: 9, marginLeft: 4, fontSize: 18, fontWeight: "700", color: colors.black }, // giá lùi vào một chút
  body: { flex: 1, backgroundColor: colors.grey, paddingHorizontal: 17 }, // nền xám
  hint: { marginTop: 11, fontSize: 18, color: colors.black },
  swatches: { alignItems: "center", gap: 12, marginTop: 12 }, // 4 ô xếp dọc, canh giữa, cách nhau 12
  swatch: { width: 85, height: 80, ...shadow }, // ô màu 85 × 80 có đổ bóng
  swatchOn: { borderWidth: 3, borderColor: colors.navy }, // viền đậm cho ô đang chọn
  doneBtn: {
    marginTop: "auto", marginBottom: 11, height: 42, backgroundColor: colors.blue, // đẩy xuống đáy
    borderWidth: 1, borderColor: colors.blueBorder, borderRadius: 10,
    alignItems: "center", justifyContent: "center", ...shadow,
  },
  doneText: { color: "#fff", fontSize: 20, fontWeight: "700" }, // chữ trắng đậm
});
