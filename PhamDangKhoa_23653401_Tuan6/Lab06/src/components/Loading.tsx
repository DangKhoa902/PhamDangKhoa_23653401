import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { colors } from "../theme";

// Màn hình chờ: vòng xoay + chữ "Đang tải..." canh giữa
export function Loading({ text = "Đang tải..." }: { text?: string }) {
  return (
    <View style={styles.center}>
      {/* Vòng xoay có sẵn của React Native */}
      <ActivityIndicator size="large" color={colors.red} />
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "#fff" }, // chiếm hết màn hình, canh giữa
  text: { marginTop: 12, color: colors.muted, fontSize: 15 },
});
