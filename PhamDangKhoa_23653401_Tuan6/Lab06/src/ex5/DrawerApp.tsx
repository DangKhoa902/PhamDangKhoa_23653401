import React from "react";
import { StyleSheet, Switch, Text, View } from "react-native";
import { DarkTheme, DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../theme";
import { SettingsProvider, usePalette, useSettings } from "./SettingsContext";

// 3 màn trong Drawer, không màn nào nhận tham số
type DrawerParamList = { Home: undefined; Profile: undefined; Settings: undefined };
const Drawer = createDrawerNavigator<DrawerParamList>();

// Icon (dạng viền) cho từng mục menu
const ICONS: Record<keyof DrawerParamList, keyof typeof Ionicons.glyphMap> = {
  Home: "home-outline",
  Profile: "person-outline",
  Settings: "settings-outline",
};

// Màn Trang chủ: chỉ có dòng chào; nền đổi theo chế độ tối (TODO 3)
function HomeScreen() {
  const p = usePalette();
  return (
    <View style={[s.center, { backgroundColor: p.bg }]}>
      <Text style={[s.big, { color: p.text }]}>Xin chào 👋</Text>
      <Text style={[s.muted, { color: p.muted }]}>Kéo từ mép trái hoặc bấm ☰ để mở menu</Text>
    </View>
  );
}

// Màn Cá nhân: avatar + tên + email; nền đổi theo chế độ tối (TODO 3)
function ProfileScreen() {
  const p = usePalette();
  return (
    <View style={[s.center, { backgroundColor: p.bg }]}>
      <View style={s.avatar}>
        <Text style={s.avatarText}>NA</Text>
      </View>
      <Text style={[s.big, { color: p.text }]}>Nguyễn Văn An</Text>
      <Text style={[s.muted, { color: p.muted }]}>an.nguyen@example.com</Text>
    </View>
  );
}

// TODO 1: màn Cài đặt — 2 Switch và dòng hiển thị trạng thái
function SettingsScreen() {
  // notify (mặc định true) và dark (mặc định false) lấy từ Context thay vì useState cục bộ
  // để màn Home/Profile cũng đổi theo (TODO 3)
  const { notify, setNotify, dark, setDark } = useSettings();
  const p = usePalette();

  return (
    <View style={[s.flex, { backgroundColor: p.bg }]}>
      {/* Dòng 1: bật/tắt nhận thông báo */}
      <View style={[s.row, { backgroundColor: p.card }]}>
        <Text style={[s.label, { color: p.text }]}>Nhận thông báo</Text>
        <Switch value={notify} onValueChange={setNotify} trackColor={{ true: colors.red }} />
      </View>
      {/* Dòng 2: bật/tắt chế độ tối */}
      <View style={[s.row, { backgroundColor: p.card }]}>
        <Text style={[s.label, { color: p.text }]}>Chế độ tối</Text>
        <Switch value={dark} onValueChange={setDark} trackColor={{ true: colors.red }} />
      </View>
      {/* Dòng trạng thái — cập nhật ngay khi gạt Switch */}
      <Text style={[s.status, { color: p.muted }]}>
        Thông báo: {notify ? "BẬT" : "TẮT"} · Giao diện: {dark ? "tối" : "sáng"}
      </Text>
    </View>
  );
}

// Phần thân Drawer: tách riêng để gọi được useSettings() (phải nằm trong SettingsProvider)
function DrawerNavigator() {
  const { dark } = useSettings();
  return (
    // theme của React Navigation → header, nền menu Drawer cũng đổi sáng/tối
    <NavigationContainer theme={dark ? DarkTheme : DefaultTheme}>
      <Drawer.Navigator
        screenOptions={({ route }) => ({
          drawerActiveTintColor: colors.red, // mục đang chọn tô đỏ
          // Icon theo tên route
          drawerIcon: ({ color, size }) => <Ionicons name={ICONS[route.name]} size={size} color={color} />,
        })}
      >
        {/* title tiếng Việt hiển thị trên header và trong menu */}
        <Drawer.Screen name="Home" component={HomeScreen} options={{ title: "Trang chủ" }} />
        <Drawer.Screen name="Profile" component={ProfileScreen} options={{ title: "Cá nhân" }} />
        <Drawer.Screen name="Settings" component={SettingsScreen} options={{ title: "Cài đặt" }} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

// TODO 2: ứng dụng Drawer — bọc SettingsProvider ngoài cùng
export function DrawerApp() {
  return (
    <SettingsProvider>
      <DrawerNavigator />
    </SettingsProvider>
  );
}

const s = StyleSheet.create({
  flex: { flex: 1, padding: 16, gap: 12 },
  center: { flex: 1, alignItems: "center", justifyContent: "center", gap: 6 },
  big: { fontSize: 24, fontWeight: "700" },
  muted: { fontSize: 14 },
  avatar: {
    width: 96, height: 96, borderRadius: 48, backgroundColor: colors.red, // hình tròn
    alignItems: "center", justifyContent: "center", marginBottom: 10,
  },
  avatarText: { color: "#fff", fontSize: 32, fontWeight: "700" },
  row: {
    flexDirection: "row", alignItems: "center", justifyContent: "space-between", // chữ trái, Switch phải
    paddingHorizontal: 16, paddingVertical: 12, borderRadius: 8,
  },
  label: { fontSize: 16 },
  status: { marginTop: 8, fontSize: 15, textAlign: "center" },
});
