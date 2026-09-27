
import React from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
} from "react-native";

// Bổ sung màn hình chi tiết sách
export type TabKey = "home" | "category" | "cart" | "account";

const TABS: {
  key: TabKey;
  label: string;
  icon: string;
}[] = [
  { key: "home", label: "Trang chủ", icon: "🏠" },
  { key: "category", label: "Danh mục", icon: "📂" },
  { key: "cart", label: "Giỏ hàng", icon: "🛒" },
  { key: "account", label: "Tài khoản", icon: "👤" },
];

type TabBarProps = {
  active: TabKey;
  onChange: (key: TabKey) => void;
};

export function TabBar({
  active,
  onChange,
}: TabBarProps) {
  return (
    <View style={styles.bar}>
      {TABS.map((tab) => {
        const isActive = active === tab.key;

        return (
          <Pressable
            key={tab.key}
            style={({ pressed }) => [
              styles.tabItem,
              pressed && styles.pressed,
            ]}
            onPress={() => onChange(tab.key)}
            accessibilityRole="tab"
            accessibilityLabel={tab.label}
            accessibilityState={{
              selected: isActive,
            }}
          >
            <Text
              style={[
                styles.icon,
                isActive && styles.iconActive,
              ]}
            >
              {tab.icon}
            </Text>

            <Text
              style={[
                styles.label,
                isActive && styles.labelActive,
              ]}
              numberOfLines={1}
            >
              {tab.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    // Cố định TabBar phía dưới
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,

    height: 64,
    flexDirection: "row",

    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    zIndex: 10,
    elevation: 10,
  },

  tabItem: {
    // Chia đều chiều rộng cho 5 tab
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 2,
  },

  pressed: {
    opacity: 0.6,
  },

  icon: {
    fontSize: 18,
    opacity: 0.5,
  },

  iconActive: {
    opacity: 1,
  },

  label: {
    fontSize: 10,
    color: "#9CA3AF",
  },

  labelActive: {
    color: "#4338CA",
    fontWeight: "700",
  },
});
