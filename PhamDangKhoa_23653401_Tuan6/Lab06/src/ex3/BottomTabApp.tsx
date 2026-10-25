import React, { useState } from "react";
import { FlatList, StyleSheet, Text, TextInput, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { PHONES } from "../data/phones";
import { colors } from "../theme";

// 3 tab, không tab nào nhận tham số
type TabParamList = { Home: undefined; Search: undefined; Profile: undefined };
const Tab = createBottomTabNavigator<TabParamList>();

// Tên icon cho từng tab: [khi chọn (đặc), khi không chọn (viền)]
const ICONS: Record<keyof TabParamList, [keyof typeof Ionicons.glyphMap, keyof typeof Ionicons.glyphMap]> = {
  Home: ["home", "home-outline"],
  Search: ["search", "search-outline"],
  Profile: ["person", "person-outline"],
};

// Tab Trang chủ: FlatList đơn giản liệt kê tên các điện thoại
function HomeTab() {
  return (
    <FlatList
      data={PHONES}
      keyExtractor={(p) => p.id} // khóa duy nhất cho mỗi dòng
      contentContainerStyle={{ padding: 16, gap: 10 }}
      renderItem={({ item }) => (
        <View style={s.card}>
          {/* Chỉ lấy phần tên trước dấu " - " */}
          <Text>{item.name.split(" - ")[0]}</Text>
        </View>
      )}
    />
  );
}

// TODO 1: Tab Tìm kiếm — ô nhập từ khóa + danh sách kết quả lọc
function SearchTab() {
  // Từ khóa người dùng nhập
  const [keyword, setKeyword] = useState("");
  // Chuẩn hóa: bỏ khoảng trắng 2 đầu, đổi về chữ thường để so sánh không phân biệt hoa/thường
  const q = keyword.trim().toLowerCase();
  // Lọc sản phẩm có tên chứa từ khóa (từ khóa rỗng → giữ tất cả)
  const results = PHONES.filter((p) => p.name.toLowerCase().includes(q));

  return (
    <View style={s.flex}>
      {/* Ô nhập: value + onChangeText → component có kiểm soát (controlled) */}
      <TextInput
        value={keyword}
        onChangeText={setKeyword}
        placeholder="Nhập từ khóa"
        style={s.input}
        autoCorrect={false}
      />
      <FlatList
        data={results}
        keyExtractor={(p) => p.id}
        contentContainerStyle={{ padding: 16, paddingTop: 0, gap: 10 }}
        renderItem={({ item }) => (
          <View style={s.card}>
            <Text>{item.name.split(" - ")[0]}</Text>
          </View>
        )}
        // Danh sách rỗng → thông báo không có kết quả
        ListEmptyComponent={<Text style={s.empty}>Không có kết quả cho “{keyword}”</Text>}
      />
    </View>
  );
}

// TODO 2: Tab Cá nhân — Avatar tròn + tên + email, canh giữa màn hình
function ProfileTab() {
  const name = "Phạm Đăng Khoa";
  return (
    <View style={s.center}>
      {/* Avatar: View bo tròn (borderRadius = 1/2 cạnh), hiện chữ cái đầu của tên */}
      <View style={s.avatar}>
        <Text style={s.avatarText}>{name.charAt(0)}</Text>
      </View>
      <Text style={s.name}>{name}</Text>
      <Text style={s.muted}>khoa.pham@example.com</Text>
    </View>
  );
}

// TODO 3: ứng dụng Bottom Tab với 3 màn và icon Ionicons
export function BottomTabApp() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        // screenOptions dạng hàm để biết route hiện tại → chọn đúng icon
        screenOptions={({ route }) => ({
          tabBarActiveTintColor: colors.red, // tab đang chọn tô đỏ
          tabBarInactiveTintColor: colors.muted,
          // focused = tab đang chọn → icon đặc (chỉ số 0), ngược lại → icon viền (chỉ số 1)
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name={ICONS[route.name][focused ? 0 : 1]} size={size} color={color} />
          ),
        })}
      >
        {/* title tiếng Việt hiển thị trên header và nhãn tab */}
        <Tab.Screen name="Home" component={HomeTab} options={{ title: "Trang chủ" }} />
        <Tab.Screen name="Search" component={SearchTab} options={{ title: "Tìm kiếm" }} />
        <Tab.Screen name="Profile" component={ProfileTab} options={{ title: "Cá nhân" }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const s = StyleSheet.create({
  flex: { flex: 1 },
  card: { backgroundColor: "#fff", padding: 14, borderRadius: 8, borderWidth: 1, borderColor: colors.line },
  input: {
    margin: 16, height: 44, paddingHorizontal: 12, backgroundColor: "#fff",
    borderWidth: 1, borderColor: colors.line, borderRadius: 8, fontSize: 16,
  },
  empty: { textAlign: "center", color: colors.muted, marginTop: 24 },
  center: { flex: 1, alignItems: "center", justifyContent: "center" }, // canh giữa cả 2 chiều
  avatar: {
    width: 96, height: 96, borderRadius: 48, // hình tròn
    backgroundColor: colors.red, alignItems: "center", justifyContent: "center",
  },
  avatarText: { color: "#fff", fontSize: 40, fontWeight: "700" },
  name: { marginTop: 16, fontSize: 22, fontWeight: "700", color: colors.text }, // chữ lớn, đậm
  muted: { marginTop: 4, color: colors.muted },
});
