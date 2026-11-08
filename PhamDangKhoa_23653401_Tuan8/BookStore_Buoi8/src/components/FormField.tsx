import React from "react";
import { StyleSheet, Text, TextInput, TextInputProps, View } from "react-native";
import { colors, radius } from "../theme";

interface Props extends TextInputProps {
  label: string;
  error?: string | null; // có lỗi → viền đỏ + dòng báo lỗi NGAY DƯỚI ô nhập
  right?: React.ReactNode; // (câu hỏi bổ sung 5) phần tử đặt ở mép phải ô nhập, ví dụ nút 👁
}

export function FormField({ label, error, style, right, ...rest }: Props) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputWrap}>
        <TextInput
          style={[styles.input, error ? styles.inputError : null, right ? styles.inputWithRight : null, style]}
          placeholderTextColor={colors.muted}
          autoCapitalize="none"
          {...rest}
        />
        {right ? <View style={styles.right}>{right}</View> : null}
      </View>
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { gap: 4 },
  label: { fontWeight: "700", color: colors.text },
  inputWrap: { position: "relative", justifyContent: "center" },
  input: { backgroundColor: "#fff", borderWidth: 1, borderColor: colors.line, borderRadius: radius.md, paddingHorizontal: 12, paddingVertical: 10, color: colors.text },
  inputWithRight: { paddingRight: 44 },
  inputError: { borderColor: colors.danger },
  right: { position: "absolute", right: 8, top: 0, bottom: 0, justifyContent: "center" },
  error: { color: colors.danger, fontSize: 12 },
});
