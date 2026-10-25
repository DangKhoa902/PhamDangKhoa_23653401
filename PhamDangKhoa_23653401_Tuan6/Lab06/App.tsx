import React, { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { SelectPhoneLocal } from "./src/ex1/SelectPhoneLocal";
import { SelectPhoneApi } from "./src/ex1/SelectPhoneApi";
import { BottomTabApp } from "./src/ex3/BottomTabApp";
import { StackTabApp } from "./src/ex4/StackTabApp";
import { DrawerApp } from "./src/ex5/DrawerApp";
import { USING_API } from "./src/api/phoneApi";
import { colors } from "./src/theme";

// Danh sách 5 bài: tiêu đề, mô tả và component tương ứng
const LESSONS = [
  { title: "Bài 1 — Select Phone", desc: "Stack, truyền params & nhận kết quả quay lại", Component: SelectPhoneLocal },
  {
    title: "Bài 2 — Select Phone + API",
    desc: USING_API ? "Đang dùng API: EXPO_PUBLIC_API_URL" : "Chưa đặt EXPO_PUBLIC_API_URL → dữ liệu mẫu offline",
    Component: SelectPhoneApi,
  },
  { title: "Bài 3 — Bottom Tab", desc: "Home / Search / Profile, Ionicons, FlatList, TextInput", Component: BottomTabApp },
  { title: "Bài 4 — Stack + Tab + Params", desc: "Điều hướng lồng nhau, ProductDetails {id}, Context", Component: StackTabApp },
  { title: "Bài 5 — Drawer", desc: "Home / Profile / Settings, Switch, chế độ tối", Component: DrawerApp },
];

// Màn menu: chọn bài 1 → 5
export default function App() {
  // Chỉ số bài đang mở (null = đang ở menu)
  const [current, setCurrent] = useState<number | null>(null);
  const lesson = current === null ? null : LESSONS[current];

  return (
    // GestureHandlerRootView: bắt buộc bọc gốc để cử chỉ vuốt (Drawer) hoạt động
    <GestureHandlerRootView style={styles.flex}>
      <SafeAreaProvider>
        <StatusBar style="dark" />
        {lesson ? (
          <View style={styles.flex}>
            {/* Thanh nhỏ phía trên để quay về menu */}
            <SafeAreaView edges={["top"]} style={styles.bar}>
              <Pressable onPress={() => setCurrent(null)} hitSlop={10}>
                <Text style={styles.barBack}>‹ Menu</Text>
              </Pressable>
              <Text style={styles.barTitle} numberOfLines={1}>{lesson.title}</Text>
            </SafeAreaView>
            {/* SafeAreaProvider lồng: tự đo lại vùng an toàn theo vị trí của nó
                → các màn bên trong không bị cộng thêm khoảng tai thỏ lần nữa */}
            <SafeAreaProvider style={styles.flex}>
              <lesson.Component />
            </SafeAreaProvider>
          </View>
        ) : (
          <SafeAreaView style={styles.menu}>
            <ScrollView contentContainerStyle={styles.list}>
              <Text style={styles.heading}>Lab 06 — Navigation</Text>
              <Text style={styles.sub}>Phạm Đăng Khoa · 23653401</Text>
              {/* Mỗi bài là một thẻ bấm được → mở bài tương ứng */}
              {LESSONS.map((l, i) => (
                <Pressable
                  key={l.title}
                  onPress={() => setCurrent(i)}
                  style={({ pressed }) => [styles.card, pressed && { opacity: 0.6 }]}
                >
                  <Text style={styles.cardTitle}>{l.title}</Text>
                  <Text style={styles.cardDesc}>{l.desc}</Text>
                </Pressable>
              ))}
            </ScrollView>
          </SafeAreaView>
        )}
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  menu: { flex: 1, backgroundColor: colors.bg },
  list: { padding: 16, gap: 12 },
  heading: { fontSize: 24, fontWeight: "700", color: colors.text },
  sub: { color: colors.muted, marginBottom: 8 },
  card: { backgroundColor: "#fff", borderRadius: 10, padding: 16, borderWidth: 1, borderColor: colors.line },
  cardTitle: { fontSize: 17, fontWeight: "700", color: colors.text },
  cardDesc: { marginTop: 4, color: colors.muted },
  bar: {
    flexDirection: "row", alignItems: "center", gap: 12, paddingHorizontal: 12, paddingBottom: 8,
    backgroundColor: colors.bg, borderBottomWidth: 1, borderBottomColor: colors.line,
  },
  barBack: { color: colors.red, fontSize: 16, fontWeight: "700", paddingTop: 8 },
  barTitle: { flex: 1, color: colors.text, fontWeight: "600", paddingTop: 8 },
});
