import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem } from "../types";

interface CartState {
  items: CartItem[];
}
const initialState: CartState = { items: [] };

// Giữ số lượng trong khoảng [1, stock]
const clamp = (q: number, stock: number) => Math.max(1, Math.min(q, stock));

// Reducer viết kiểu "mutate" — Immer tạo state mới bất biến phía sau
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Sách đã có trong giỏ → tăng số lượng (không vượt tồn kho); chưa có → thêm mới với quantity = 1
    addItem(state, action: PayloadAction<Omit<CartItem, "quantity">>) {
      const existing = state.items.find((i) => i.bookId === action.payload.bookId);
      if (existing) {
        existing.quantity = clamp(existing.quantity + 1, existing.stock);
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    removeItem(state, action: PayloadAction<number>) {
      state.items = state.items.filter((i) => i.bookId !== action.payload);
    },
    setQuantity(state, action: PayloadAction<{ bookId: number; quantity: number }>) {
      const item = state.items.find((i) => i.bookId === action.payload.bookId);
      if (item) item.quantity = clamp(action.payload.quantity, item.stock);
    },
    clearCart(state) {
      state.items = [];
    },
    // Dùng ở buổi sau: nạp lại giỏ hàng đã lưu trong AsyncStorage
    hydrateCart(state, action: PayloadAction<CartItem[]>) {
      state.items = action.payload;
    },
  },
});

export const { addItem, removeItem, setQuantity, clearCart, hydrateCart } = cartSlice.actions;
export default cartSlice.reducer;
