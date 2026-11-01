# BookStore — Buổi 7

**Sinh viên:** Phạm Đăng Khoa — MSSV 23653401

Điều hướng (React Navigation) · Redux Toolkit cho giỏ hàng/tài khoản/yêu thích · gọi API bằng Axios (json-server) · loading/lỗi/rỗng · tìm kiếm debounce + lọc kết hợp.

## Chạy
```bash
npm install
npm run api          # terminal 1: json-server tại http://localhost:3000 (dữ liệu: db.json)
npx expo start       # terminal 2: bấm  w  để mở bản web, hoặc quét QR bằng Expo Go
```
- Điện thoại thật: máy tính và điện thoại cùng Wi-Fi; nếu không tự nhận được địa chỉ, đặt
  `EXPO_PUBLIC_API_URL=http://<IP-máy-tính>:3000` trước lệnh `npx expo start`.
- Kiểm tra kiểu: `npx tsc --noEmit`
- Đăng nhập ở buổi này là **giả lập** (nút "Đăng nhập thử").

## Đã hoàn thành
| Bài | Nội dung | File chính |
|---|---|---|
| 7.1 | Stack ngoài + Bottom Tab trong, Tab Bar tự dựng | `src/navigation/` |
| 7.2 | Truyền `bookId` sang Chi tiết, `total` sang Thanh toán | `HomeScreen`, `CartScreen` |
| 7.3 | Giỏ hàng Redux (giới hạn tồn kho), badge tab + nút giỏ nổi | `store/cartSlice.ts`, `store/hooks.ts` |
| 7.4 | Tab Tài khoản đổi theo `isLoggedIn` | `store/authSlice.ts`, `AccountScreen` |
| 7.5 | API sách: `Promise.all`, loading / lỗi / thử lại | `services/bookService.ts`, `HomeScreen`, `BookDetailScreen` |
| 7.6 | API danh mục | `services/categoryService.ts`, `CategoriesScreen` |
| 7.7 | Tìm kiếm debounce 400 ms, không dấu, EmptyState + Xóa bộ lọc | `hooks/useDebounce.ts`, `utils/filters.ts` |
| 7.8 | Lọc kết hợp từ khoá + danh mục, liên kết tab Danh mục → Home | `utils/filters.ts`, `HomeScreen`, `CategoriesScreen` |
| C1 | Wishlist ♡/♥ ở màn Chi tiết | `store/wishlistSlice.ts`, `BookDetailScreen` |
| C2 | Lọc theo khoảng giá | `utils/filters.ts`, `components/PriceFilter.tsx` |
| Câu 5 | Sắp xếp giá tăng / giảm dần | `HomeScreen` |

Trả lời câu hỏi bổ sung: [TraLoi.md](TraLoi.md). Mô tả giao diện: `docs/UI.md`, ảnh trong `docs/ui/`.
