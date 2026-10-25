import React, { createContext, useCallback, useContext, useMemo, useState } from "react";

// Dữ liệu Context chia sẻ: danh sách id yêu thích + hàm bật/tắt + hàm kiểm tra
type Ctx = {
  ids: string[];
  toggle: (id: string) => void;
  has: (id: string) => boolean;
};

const FavoritesContext = createContext<Ctx | null>(null);

// Provider bọc ngoài toàn bộ navigator để mọi màn (Products, Favorites, ProductDetails) dùng chung state
export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  // Danh sách id sản phẩm đã lưu
  const [ids, setIds] = useState<string[]>([]);
  // Có rồi → bỏ ra; chưa có → thêm vào (dùng hàm cập nhật để luôn lấy state mới nhất)
  const toggle = useCallback(
    (id: string) => setIds((cur) => (cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id])),
    [],
  );
  // useMemo: chỉ tạo object value mới khi ids thay đổi → tránh render thừa
  const value = useMemo(() => ({ ids, toggle, has: (x: string) => ids.includes(x) }), [ids, toggle]);
  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}

// Hook đọc Context; báo lỗi rõ ràng nếu quên bọc FavoritesProvider
export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error("useFavorites phải được dùng bên trong <FavoritesProvider>");
  return ctx;
}
