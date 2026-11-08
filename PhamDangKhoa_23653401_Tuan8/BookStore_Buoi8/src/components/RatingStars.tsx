import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "../theme";

interface Props {
  value: number; // 0–5 (có thể lẻ, làm tròn khi vẽ)
  size?: number;
  onChange?: (v: number) => void; // có truyền → cho phép bấm chọn sao
}

// BT8.5a: component sao TÁI SỬ DỤNG
//   - chỉ có value → chỉ hiển thị (điểm trung bình, từng đánh giá)
//   - có onChange → mỗi sao bấm được (form đánh giá)
export function RatingStars({ value, size = 18, onChange }: Props) {
  const filled = Math.round(value);
  return (
    <View style={styles.row} accessibilityLabel={onChange ? undefined : `${value.toFixed(1)} trên 5 sao`}>
      {[1, 2, 3, 4, 5].map((n) => {
        const color = n <= filled ? colors.warning : colors.line;
        if (!onChange) {
          return (
            <Text key={n} style={{ fontSize: size, color }}>
              ★
            </Text>
          );
        }
        return (
          <Pressable key={n} onPress={() => onChange(n)} hitSlop={4} accessibilityRole="button" accessibilityLabel={`${n} sao`}>
            <Text style={{ fontSize: size, color }}>★</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "center", gap: 2 },
});
