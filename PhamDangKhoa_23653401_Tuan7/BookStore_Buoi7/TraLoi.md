# Buổi 7 — Trả lời câu hỏi bổ sung

**Sinh viên:** Phạm Đăng Khoa — MSSV 23653401

## 1. Cấu trúc điều hướng

`BookDetail` được đăng ký ở Native Stack (tầng ngoài, cha của `Tabs`) nên khi mở, nó được đẩy lên **trên toàn bộ** màn Tabs: che luôn Tab Bar và tự có header với nút ← quay lại. Nếu đặt `BookDetail` vào Bottom Tab, nó sẽ trở thành một tab ngang hàng với Home/Giỏ hàng: Tab Bar vẫn hiện ở dưới, không có nút quay lại, và phải tìm cách ẩn nó khỏi thanh tab. Ngoài ra lịch sử điều hướng cũng sai ý nghĩa — "Chi tiết" là màn đi sâu vào một cuốn sách chứ không phải một mục chính của app.

## 2. Redux

Redux Toolkit dùng **Immer** bên trong `createSlice`: reducer nhận một bản nháp (draft/proxy) của state, `state.items.push(...)` chỉ ghi lại thay đổi trên bản nháp, sau đó Immer tạo ra một object state **mới** bất biến, còn state cũ giữ nguyên. Nếu bỏ `useMemo` trong `useCart`, kết quả hiển thị (tổng số lượng, tổng tiền) **vẫn đúng** vì vẫn tính từ cùng `items`. Hậu quả chỉ là hiệu năng: mỗi lần component dùng `useCart` render lại thì `reduce` lại chạy, giỏ hàng lớn hoặc render nhiều mới thấy tốn — `useMemo` là tối ưu, không quyết định đúng/sai.

## 3. Promise.all

`Promise.all` bị reject ngay khi **một** promise lỗi, nên nếu `getCategories()` lỗi thì code nhảy vào `catch`: Home hiện `ErrorView`, dù `getBooks()` đã tải xong sách. Dùng `Promise.allSettled` thì luôn nhận được kết quả của cả hai, và có thể hiển thị sách khi chỉ danh mục bị lỗi:

```ts
const [b, c] = await Promise.allSettled([getBooks(), getCategories()]);
if (b.status === "fulfilled") setBooks(b.value); else setError(getErrorMessage(b.reason));
setCategories(c.status === "fulfilled" ? c.value : []);   // lỗi danh mục → chỉ mất các chip
```

Đánh đổi: phải tự kiểm tra `status` và xử lý lỗi cho từng phần (code dài hơn), và giao diện có thể ở trạng thái "thiếu một nửa" (có sách nhưng không có chip danh mục) — cần quyết định báo lỗi phần thiếu cho người dùng thế nào.

## 4. Debounce

Nếu gọi `setTimeout` thẳng trong `onChangeText` thì mỗi phím gõ tạo một hẹn giờ riêng và không cái nào bị huỷ — danh sách vẫn bị lọc 10 lần cho 10 phím, chỉ là chậm đi 400 ms chứ không gộp lại thành một lần. Đặt trong `useEffect` của `useDebounce`, hàm dọn dẹp `return () => clearTimeout(t)` chạy mỗi khi `value` đổi, **huỷ hẹn giờ cũ**, nên chỉ lần gõ cuối cùng được áp dụng. Hàm dọn dẹp cũng chạy khi component bị gỡ (unmount), tránh việc hẹn giờ còn sót gọi `setState` trên component không còn tồn tại.

## 5. Code bổ sung — sắp xếp theo giá

Đã cài trong [`src/screens/HomeScreen.tsx`](src/screens/HomeScreen.tsx): thêm **một state** `sortOrder` và sửa **một chỗ** là `useMemo` của `visibleBooks`. Nút "⇅ Sắp xếp giá" ở đầu lưới bấm xoay vòng: mặc định → giá tăng dần → giá giảm dần → mặc định.

```tsx
type SortOrder = "asc" | "desc" | null;
const [sortOrder, setSortOrder] = useState<SortOrder>(null);

const visibleBooks = useMemo(() => {
  const filtered = filterBooks(books, { keyword: debouncedKeyword, categoryId, priceRange });
  if (sortOrder === null) return filtered;
  // sort() sửa mảng tại chỗ → sắp xếp trên bản sao
  return [...filtered].sort((a, b) => (sortOrder === "asc" ? a.price - b.price : b.price - a.price));
}, [books, debouncedKeyword, categoryId, priceRange, sortOrder]);
```

Sắp xếp chạy **sau** khi lọc nên dùng chung được với từ khoá, danh mục và khoảng giá.

_Ảnh chụp màn hình kết quả: (đính kèm)_

---

## Thử thách

### BT7.C1 — Wishlist

- `toggleWishlist` trong [`wishlistSlice.ts`](src/store/wishlistSlice.ts): id đã có thì bỏ ra (`splice`), chưa có thì thêm vào (`push`).
- Nút ♡/♥ ở góc bìa sách trong [`BookDetailScreen.tsx`](src/screens/BookDetailScreen.tsx), dùng `useWishlist()` (`isFavorite`, `toggle`).

**Vì sao đổi thư viện state thì giao diện không phải sửa?** Màn hình không import gì của Redux (`useSelector`, `dispatch`, action…) mà chỉ gọi hook `useWishlist()` trong [`hooks.ts`](src/store/hooks.ts) — hook này đóng vai trò **adapter** với "hợp đồng" cố định `{ ids, isFavorite, toggle }`. Nếu đổi sang Zustand/Recoil, chỉ cần viết lại phần ruột của `useWishlist()` sao cho vẫn trả về đúng các trường đó; mọi component đang dùng hook giữ nguyên.

### BT7.C2 — Lọc theo khoảng giá

- `inRange` trong [`filters.ts`](src/utils/filters.ts): `lt100` < 100.000 đ · `100to300` từ 100.000 đến 300.000 đ · `gt300` > 300.000 đ · `null` = không lọc.
- `filterBooks` thêm điều kiện `inRange(b.price, f.priceRange)` — kết hợp AND với từ khoá và danh mục.
- [`PriceFilter.tsx`](src/components/PriceFilter.tsx): 3 nút từ `PRICE_RANGES`, nút đang chọn nền cyan, bấm lại để bỏ chọn.
