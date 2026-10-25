import React, { createContext, useContext, useMemo, useState } from "react";

// TODO 3 (nâng cao): đưa notify/dark lên Context để mọi màn trong Drawer cùng đọc được
type SettingsCtx = {
  notify: boolean; // nhận thông báo
  setNotify: (v: boolean) => void;
  dark: boolean; // giao diện tối
  setDark: (v: boolean) => void;
};

const SettingsContext = createContext<SettingsCtx | null>(null);

// Provider giữ state cài đặt; bọc ngoài NavigationContainer của Bài 5
export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [notify, setNotify] = useState(true); // mặc định BẬT thông báo
  const [dark, setDark] = useState(false); // mặc định giao diện sáng
  // Chỉ tạo object mới khi một trong 2 giá trị thay đổi
  const value = useMemo(() => ({ notify, setNotify, dark, setDark }), [notify, dark]);
  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}

// Hook đọc cài đặt; báo lỗi nếu quên bọc SettingsProvider
export function useSettings() {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error("useSettings phải được dùng bên trong <SettingsProvider>");
  return ctx;
}

// Bảng màu nền/chữ theo chế độ sáng/tối
export function usePalette() {
  const { dark } = useSettings();
  return dark
    ? { bg: "#121418", card: "#1E2128", text: "#F3F4F6", muted: "#9CA3AF" }
    : { bg: "#FFFFFF", card: "#F4F5F7", text: "#1F2430", muted: "#6B7280" };
}
