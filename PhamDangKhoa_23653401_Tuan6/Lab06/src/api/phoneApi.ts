import { PHONES } from "../data/phones";
import { Phone } from "../types";

// Địa chỉ API đọc từ biến môi trường EXPO_PUBLIC_API_URL (bỏ dấu "/" ở cuối nếu có)
// Vd: https://xxxxxxxx.mockapi.io/api/v1
export const API_URL = (process.env.EXPO_PUBLIC_API_URL ?? "").replace(/\/$/, "");
// Có URL → gọi API thật; không có → dùng dữ liệu mẫu offline
export const USING_API = API_URL !== "";
// Hàm chờ ms mili-giây (dùng để giả lập độ trễ mạng)
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

// Lấy 1 sản phẩm theo id
export async function fetchPhone(id: string): Promise<Phone> {
  if (!USING_API) {
    // chế độ offline: giả lập độ trễ để thấy loading
    await sleep(600);
    const p = PHONES.find((x) => x.id === id);
    if (!p) throw new Error("Không tìm thấy sản phẩm");
    return p;
  }
  // Gọi GET <API_URL>/phones/<id>
  const res = await fetch(`${API_URL}/phones/${id}`);
  // Mã HTTP khác 2xx → ném lỗi để màn hình hiện ErrorBox
  if (!res.ok) throw new Error(`Máy chủ trả về lỗi ${res.status}`);
  // Chuyển body JSON thành đối tượng Phone
  return (await res.json()) as Phone;
}
