import React from "react";
import { Text } from "react-native";
import { colors } from "../theme";

// Hiển thị 5 ngôi sao: `value` sao vàng, phần còn lại màu xám
// `gap` = khoảng cách giữa các sao (thiết kế Figma có khoảng hở giữa từng sao)
export function Stars({ value, size = 16, gap = 1 }: { value: number; size?: number; gap?: number }) {
  return (
    <Text style={{ color: colors.star, fontSize: size, lineHeight: size * 1.2, letterSpacing: gap }}>
      {/* Sao vàng = số sao đánh giá */}
      {"★".repeat(value)}
      {/* Sao xám = phần còn thiếu cho đủ 5 */}
      <Text style={{ color: colors.line }}>{"★".repeat(5 - value)}</Text>
    </Text>
  );
}
