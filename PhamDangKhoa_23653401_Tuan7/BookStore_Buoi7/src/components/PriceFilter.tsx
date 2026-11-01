import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { PRICE_RANGES, PriceRange } from "../utils/filters";
import { colors, radius } from "../theme";

interface Props {
  value: PriceRange;
  onChange: (v: PriceRange) => void;
}

// 3 nút lọc khoảng giá — bấm lại nút đang chọn để bỏ chọn
export function PriceFilter({ value, onChange }: Props) {
  return (
    <View style={styles.row}>
      {PRICE_RANGES.map((r) => {
        const active = value === r.key;
        return (
          <Pressable key={r.key} style={[styles.btn, active && styles.btnActive]} onPress={() => onChange(active ? null : r.key)}>
            <Text style={[styles.text, active && styles.textActive]}>{r.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", gap: 8, paddingHorizontal: 12, paddingBottom: 10 },
  btn: { flex: 1, alignItems: "center", paddingVertical: 8, borderRadius: radius.md, backgroundColor: "#fff", borderWidth: 1, borderColor: colors.line },
  btnActive: { backgroundColor: colors.cyan, borderColor: colors.cyan },
  text: { color: colors.text, fontWeight: "600", fontSize: 13 },
  textActive: { color: "#fff", fontWeight: "800" },
});
