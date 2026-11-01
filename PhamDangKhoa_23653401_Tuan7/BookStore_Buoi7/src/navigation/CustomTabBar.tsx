import React from "react";
import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { TabBar, TabItem } from "../components/TabBar";
import { useCart } from "../store/hooks";

const EMOJI: Record<string, string> = { Home: "🏠", Categories: "🗂️", Cart: "🛒", Account: "👤" };

// Cầu nối giữa React Navigation và TabBar (thuần giao diện):
// đổi state.routes thành mảng TabItem và xử lý sự kiện bấm tab.
export function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const { totalQuantity } = useCart();

  const items: TabItem[] = state.routes.map((route) => ({
    key: route.key,
    label: descriptors[route.key].options.title ?? route.name,
    emoji: EMOJI[route.name] ?? "•",
    badge: route.name === "Cart" ? totalQuantity : undefined,
  }));

  const onPress = (key: string) => {
    const index = state.routes.findIndex((r) => r.key === key);
    if (index < 0) return;
    const route = state.routes[index];

    const event = navigation.emit({ type: "tabPress", target: route.key, canPreventDefault: true });

    // Chỉ chuyển màn khi tab chưa mở và không bị chặn bởi listener nào
    if (state.index !== index && !event.defaultPrevented) {
      navigation.navigate(route.name, route.params);
    }
  };

  return <TabBar items={items} activeKey={state.routes[state.index].key} onPress={onPress} />;
}
