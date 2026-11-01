import { useEffect, useState } from "react";

// Trả về giá trị "đã trễ": chỉ cập nhật sau khi người dùng ngừng gõ `delay` ms
export function useDebounce<T>(value: T, delay = 400): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    // Gõ tiếp (value đổi) hoặc unmount → huỷ hẹn giờ cũ, chỉ lần gõ cuối được áp dụng
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debounced;
}
