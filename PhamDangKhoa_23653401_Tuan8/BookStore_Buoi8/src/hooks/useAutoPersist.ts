import { useEffect } from "react";
import { saveJSON } from "../storage/storage";

// HOOK CHUNG: mỗi khi `value` đổi (và đã nạp xong dữ liệu cũ) → tự ghi vào AsyncStorage.
// Dùng cho cart, wishlist… — không phải viết lại effect ở từng nơi.
// BT8.7b: cờ ready chặn việc ghi quá sớm — ở lần render đầu store còn rỗng,
//   nếu ghi ngay thì mảng rỗng sẽ đè lên dữ liệu đã lưu trước khi kịp đọc ra.
export function useAutoPersist<T>(key: string, value: T, ready: boolean) {
  useEffect(() => {
    if (ready) saveJSON(key, value);
  }, [key, value, ready]);
}
