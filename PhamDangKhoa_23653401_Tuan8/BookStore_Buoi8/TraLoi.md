# Buổi 8 – Trả lời câu hỏi bổ sung

**Sinh viên:** Phạm Đăng Khoa – MSSV 23653401

---

## Câu 1. Cờ `ready` trong `useAutoPersist`

Nếu bỏ điều kiện `ready`, giỏ hàng đã lưu sẽ bị mất khi mở lại app. Thứ tự xảy ra:

1. **Render đầu tiên:** store vừa khởi tạo nên `cart.items = []`. Effect trong `useAutoPersist` chạy ngay và gọi `saveJSON("@bookstore/cart", [])`, tức là ghi mảng rỗng đè lên giỏ cũ trong AsyncStorage.
2. Cùng lúc đó, effect đọc trong `usePersistence` đang chờ `loadJSON(CART_KEY)`. Lệnh ghi đã chạy trước nên lệnh đọc nhận về `[]` (hoặc đọc được dữ liệu cũ thì cũng chỉ là may mắn, vì hai thao tác chạy đua nhau).
3. **Render sau khi đọc xong:** `hydrateCart([])` nên giỏ vẫn rỗng. Dữ liệu cũ đã mất hẳn.

Cờ `ready` chỉ bật **sau khi** đọc xong (`setReady(true)` đặt sau `await Promise.all(...)`). Vì vậy lần ghi đầu tiên luôn dùng dữ liệu đã được nạp lại vào store.

---

## Câu 2. Token giả

Hai điểm không an toàn:

1. **Mật khẩu so ở phía app:** app gọi `GET /users?email=...`, nhận về cả bản ghi user **kèm mật khẩu dạng thô** rồi tự so sánh. Ai xem được mạng (DevTools) hoặc gọi thẳng API là đọc được mật khẩu của mọi tài khoản.
2. **Token do app tự tạo:** server không cấp và không kiểm tra token, nên ai cũng làm giả được. Token cũng không có thời hạn và không thu hồi được.

Trong hệ thống thật, **server** mới là nơi kiểm tra mật khẩu: mật khẩu được lưu dạng băm (bcrypt/argon2), server so sánh rồi cấp token có ký và có thời hạn (ví dụ JWT kèm refresh token). Ở app, token nên lưu trong kho bảo mật của hệ điều hành bằng **`expo-secure-store`** (iOS Keychain / Android Keystore), không lưu dạng thô trong AsyncStorage vì đó là nơi lưu không mã hóa.

---

## Câu 3. Hai effect trong `CartItemRow`

Nếu xóa effect đồng bộ `useEffect(() => setQty(item.quantity), [item.quantity])`, thì `qty` cục bộ chỉ nhận giá trị **một lần** lúc component được tạo. Sau đó store có đổi từ nơi khác thì số trên nút vẫn giữ giá trị cũ. Các thao tác gây lệch:

- **Thêm vào giỏ từ trang Chi tiết** một cuốn đã có trong giỏ: store tăng từ 2 lên 3, nhưng ở tab Giỏ hàng nút vẫn hiện 2. Nếu bấm + tiếp, debounce sẽ ghi 3 (2 + 1) thay vì 4.
- **Nạp lại giỏ từ AsyncStorage khi mở app** (`hydrateCart`): nếu dòng hàng đã được render trước khi nạp xong, nó vẫn hiện số lượng cũ.
- **Store kẹp số lượng theo tồn kho** (`clamp` trong `setQuantity`): khi store sửa lại giá trị, nút không nhận được giá trị đã sửa.

---

## Câu 4. Một nguồn state

Nếu mỗi `HeartButton` tự giữ `useState(false)` riêng, thì mỗi nơi render nút tim sẽ có một bản trạng thái độc lập:

- Bấm ♡ ở lưới Home thì chỉ tim ở lưới đổi đỏ. Mở trang Chi tiết của cuốn đó, tim vẫn trắng vì đó là một component khác, state khởi tạo lại từ `false`.
- Màn Yêu thích không biết cuốn nào đã được thả tim, và đếm số ở tab Tài khoản cũng sai.
- Tải lại app là mất hết, vì state cục bộ không được lưu.

**Store giải quyết bằng cách giữ một nguồn dữ liệu duy nhất:** `wishlist.ids` nằm trong Redux. Mọi `HeartButton`, `WishlistScreen` và `AccountScreen` đều đọc qua `useWishlist()`. Bấm tim ở bất kỳ đâu sẽ dispatch `toggleWishlist`, store đổi, và **mọi** component đang đọc store tự render lại với cùng một giá trị. `useAutoPersist` chỉ cần ghi đúng một mảng `ids` đó.

---

## Câu 5. Code bổ sung: nút 👁 hiện/ẩn mật khẩu

Đã thêm vào màn Đăng nhập. Gồm hai thay đổi:

**a) `src/components/FormField.tsx`:** thêm prop `right` để đặt một phần tử ở mép phải ô nhập (dùng lại được cho các ô khác):

```tsx
interface Props extends TextInputProps {
  label: string;
  error?: string | null;
  right?: React.ReactNode; // ví dụ nút 👁
}

<View style={styles.inputWrap}>
  <TextInput style={[styles.input, right ? styles.inputWithRight : null, ...]} {...rest} />
  {right ? <View style={styles.right}>{right}</View> : null}
</View>
```

**b) `src/screens/LoginScreen.tsx`:** một state `showPassword` điều khiển `secureTextEntry`:

```tsx
const [showPassword, setShowPassword] = useState(false);

<FormField
  label="Mật khẩu"
  value={password}
  onChangeText={setPassword}
  error={errors.password}
  secureTextEntry={!showPassword}
  right={
    <Pressable
      onPress={() => setShowPassword((v) => !v)}
      accessibilityLabel={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
      style={{ opacity: showPassword ? 1 : 0.45, padding: 4 }}
    >
      <Text style={{ fontSize: 18 }}>👁</Text>
    </Pressable>
  }
/>
```

Mật khẩu đang ẩn thì biểu tượng 👁 mờ. Bấm vào thì mật khẩu hiện ra và biểu tượng đậm lên. Bấm lần nữa thì ẩn lại.

*(Ảnh chụp màn hình kết quả được nộp kèm riêng.)*
