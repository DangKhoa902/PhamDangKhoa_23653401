# Lab 06 — Navigation: Select Phone, API, Tab, Stack & Drawer

**Sinh viên:** Phạm Đăng Khoa — **MSSV:** 23653401
**Công nghệ:** Expo SDK 57 · React Native 0.86 · TypeScript · React Navigation 7

---

## 1. Mục tiêu đã thực hiện

| Bài | Nội dung | Kỹ năng chính | Trạng thái |
|-----|----------|---------------|:---:|
| 1 | Select Phone: thông tin sản phẩm ↔ chọn màu | Native Stack, StyleSheet, truyền params và nhận kết quả quay lại | ✅ |
| 2 | Gắn API vào Bài 1 | `fetch`, `useEffect`, `useCallback`, loading / lỗi / thử lại | ✅ |
| 3 | Bottom Tab: Home / Search / Profile | `createBottomTabNavigator`, Ionicons, FlatList, TextInput | ✅ |
| 4 | Stack + Tab + Passing Params | Điều hướng lồng nhau, `navigate("ProductDetails", { id })`, Context | ✅ |
| 5 | Drawer: Home / Profile / Settings | `createDrawerNavigator`, Switch, **TODO 3 nâng cao** (chế độ tối qua Context) | ✅ |

---

## 2. Cài đặt và chạy

```bash
npm install                 # cài thư viện (đã khai báo sẵn trong package.json)
npx expo start              # quét QR bằng Expo Go; nhấn w để mở bản web
npm run typecheck           # tsc --noEmit — kiểm tra kiểu trước khi nộp
```

Các thư viện đã cài bằng `npx expo install` (tự chọn phiên bản tương thích SDK 57):

```
@react-navigation/native  @react-navigation/native-stack  @react-navigation/bottom-tabs
@react-navigation/drawer  react-native-screens  react-native-safe-area-context
react-native-gesture-handler  react-native-reanimated  react-native-worklets
@expo/vector-icons  expo-font  react-dom  react-native-web
```

> `expo-font` được cài thêm theo khuyến nghị của `expo-doctor` (peer dependency của `@expo/vector-icons`);
> `react-dom` + `react-native-web` để chạy được bản web (phím `w`).

**API của Bài 2 đã được gắn sẵn** trong file `.env` ở thư mục gốc project:

```env
EXPO_PUBLIC_API_URL=https://6acb4860ef37b1504077b3fc.mockapi.io/api
```

Expo tự nạp biến `EXPO_PUBLIC_*` từ `.env` khi khởi động, nên chỉ cần chạy:

```bash
npx expo start -c     # -c xóa cache Metro để biến môi trường mới được nhúng vào bundle
```

App gọi `GET <API_URL>/phones/1` → `https://6acb4860ef37b1504077b3fc.mockapi.io/api/phones/1`.
Nếu xóa (hoặc để trống) `EXPO_PUBLIC_API_URL`, Bài 2 quay về dữ liệu mẫu offline (giả lập trễ 600 ms để thấy loading).

---

## 3. Cấu trúc thư mục

```
Lab06/
├─ .env                       # EXPO_PUBLIC_API_URL = địa chỉ mockapi.io (Bài 2)
├─ index.ts                   # import "react-native-gesture-handler" (đầu tiên) + registerRootComponent
├─ App.tsx                    # menu chọn Bài 1 → 5, thanh "‹ Menu" để quay lại
├─ mockapi_phones.json        # 6 bản ghi mẫu để dán vào resource "phones" trên mockapi.io
├─ assets/phones/             # blue.png, red.png, black.png, silver.png
├─ docs/review.md             # tài liệu này
└─ src/
   ├─ types.ts                # ColorKey, Phone
   ├─ theme.ts                # bảng màu + formatPrice
   ├─ data/phones.ts          # PHONE_COLORS, COLOR_ORDER, PHONES (6 sản phẩm)
   ├─ api/phoneApi.ts         # Bài 2: fetchPhone(id)
   ├─ components/             # Stars, Loading, ErrorBox
   ├─ ex1/                    # Bài 1 + 2
   │  ├─ SelectPhoneApp.tsx   #   Stack Product ↔ ChooseColor
   │  ├─ ProductScreen.tsx    #   Screen 01 / 04
   │  ├─ ChooseColorScreen.tsx#   Screen 02 / 03
   │  ├─ SelectPhoneLocal.tsx #   Bài 1: dữ liệu viết cứng
   │  └─ SelectPhoneApi.tsx   #   Bài 2: dữ liệu từ API
   ├─ ex3/BottomTabApp.tsx    # Bài 3
   ├─ ex4/                    # Bài 4: types, FavoritesContext, ProductRow,
   │                          #        ProductsTab, FavoritesTab, ProductDetailsScreen, StackTabApp
   └─ ex5/                    # Bài 5: SettingsContext, DrawerApp
```

Mọi file đều có **comment tiếng Việt** giải thích từng khối/dòng code quan trọng; các chỗ ứng với TODO
trong hướng dẫn đều được đánh dấu `TODO n:` để tiện đối chiếu khi chấm.

---

## 4. Chi tiết từng bài

### 4.0 Menu chính — `App.tsx`

- Hiển thị 5 thẻ bài học; bấm thẻ → render component của bài đó, kèm thanh **‹ Menu** ở trên để quay lại.
- Bọc gốc bằng `GestureHandlerRootView` (bắt buộc để vuốt mở Drawer) và `SafeAreaProvider`.
- Mỗi bài được bọc thêm một `SafeAreaProvider` lồng — provider này đo lại vùng an toàn theo vị trí của nó,
  nên các màn bên trong không bị cộng thêm khoảng "tai thỏ" lần thứ hai dưới thanh Menu.
- Mỗi bài có `NavigationContainer` riêng; vì tại một thời điểm chỉ một bài được render nên không xung đột.

### 4.1 Bài 1 — Select Phone

**Luồng dữ liệu**

```
Product ──(bấm "4 MÀU-CHỌN MÀU", gửi color hiện tại)──▶ ChooseColor
   ▲                                                       │ chọn 1 trong 4 ô màu (state: picked)
   └──── bấm "XONG": navigate("Product", {color: picked}, {merge: true, pop: true}) ┘
```

| Màn Figma | Màn trong code | Điểm nhận biết |
|-----------|----------------|----------------|
| Screen 01 | `ProductScreen`, `route.params?.color` = `undefined` | Ảnh xanh (màu mặc định), nút "4 MÀU-CHỌN MÀU" |
| Screen 02 | `ChooseColorScreen`, `picked` = `undefined` | Ảnh nhỏ xanh, chỉ 2 dòng tên |
| Screen 03 | `ChooseColorScreen`, `picked` = `"red"` | Thêm "Màu: **đỏ**", "Cung cấp bởi **Tiki Tradding**", giá; ảnh nhỏ đỏ |
| Screen 04 | `ProductScreen`, `color` = `"red"` | Ảnh đỏ lớn, nút "4 MÀU-CHỌN LOẠI" |

**ProductScreen**
- `shown = picked ?? phone.defaultColor` → chọn ảnh lớn từ `PHONE_COLORS[shown].image`.
- **TODO 1**: `Pressable` viền xám, `borderRadius: 6`; chữ đổi theo `picked`; dấu `>` dùng
  `position: "absolute", right: 12`; `onPress` → `navigation.navigate("ChooseColor", { color: picked })`.
- **TODO 2**: nút "CHỌN MUA" nền `colors.red`, chữ trắng đậm, đặt **ngoài** khối `info`.
  `root` là flex column và `imageWrap` có `flex: 1` nên nút luôn nằm sát đáy.

**ChooseColorScreen**
- `useState<ColorKey | undefined>(route.params?.color)` — nhớ màu đang chọn; ô màu đang chọn có viền đậm (`swatchOn`).
- **TODO 3**: `{picked && (<> ... </>)}` — Fragment gộp 3 dòng (màu, nhà cung cấp, giá), chỉ hiện khi đã chọn.
- **TODO 4**: nút "XONG" nền `colors.blue`, `borderRadius: 4`.

> **Lưu ý React Navigation 7:** khác bản 6, `navigate()` tới một màn đã có ở dưới stack sẽ **đẩy thêm màn mới**
> chứ không quay lại. Vì vậy ngoài `merge: true` (gộp params) như hướng dẫn, tôi thêm `pop: true` để
> quay về đúng màn Product cũ — nút back/vuốt sau đó không còn quay lại ChooseColor nữa.

### 4.2 Bài 2 — Gắn API

- `src/api/phoneApi.ts`: đọc `process.env.EXPO_PUBLIC_API_URL`; có URL → `fetch(`${API_URL}/phones/${id}`)`,
  `res.ok` sai → ném `Error("Máy chủ trả về lỗi <status>")`; không có URL → dữ liệu mẫu + trễ 600 ms.
- `SelectPhoneApi.tsx` — 3 trạng thái:

| TODO | Code | Ý nghĩa |
|------|------|---------|
| 1 | `setError(null); setPhone(null);` | Reset → quay về trạng thái loading (cũng dùng khi THỬ LẠI) |
| 2 | `try { setPhone(await fetchPhone("1")) } catch (e) { setError(e.message) }` | Gọi API, bắt lỗi |
| 3 | `useEffect(() => { load(); }, [load])` | Tải khi mở màn lần đầu (`load` bọc `useCallback` nên không gọi lặp) |
| 4 | `if (error) return <ErrorBox message={error} onRetry={load} />` | Báo lỗi + nút THỬ LẠI |
| 5 | `if (!phone) return <Loading />` | Vòng xoay "Đang tải..." |
| 6 | `return <SelectPhoneApp phone={phone} />` | Dùng lại toàn bộ Bài 1 |

**API trên mockapi.io:** đã tạo resource `phones` (6 bản ghi, nhập từ `mockapi_phones.json`) với các trường
`name, price, oldPrice, rating, reviewCount, supplier, badge, colors, defaultColor`.

| Endpoint | Kết quả kiểm tra |
|----------|------------------|
| `https://6acb4860ef37b1504077b3fc.mockapi.io/api/phones` | HTTP 200 — mảng 6 sản phẩm |
| `https://6acb4860ef37b1504077b3fc.mockapi.io/api/phones/1` | HTTP 200 — Vsmart Joy 3, đúng cấu trúc `Phone` |

### 4.3 Bài 3 — Bottom Tab

- `ICONS` lưu cặp `[icon đặc, icon viền]` cho mỗi tab; `tabBarIcon` chọn `ICONS[route.name][focused ? 0 : 1]`.
- **TODO 1 – SearchTab:** `TextInput` có kiểm soát (`value` + `onChangeText`); lọc
  `p.name.toLowerCase().includes(keyword.trim().toLowerCase())`; danh sách rỗng →
  `ListEmptyComponent` "Không có kết quả cho “...”".
- **TODO 2 – ProfileTab:** avatar `View` 96×96, `borderRadius: 48`, hiện chữ cái đầu; tên chữ lớn đậm; email; canh giữa.
- **TODO 3 – BottomTabApp:** `tabBarActiveTintColor: colors.red`; 3 tab với title "Trang chủ / Tìm kiếm / Cá nhân".

### 4.4 Bài 4 — Stack + Tab + Passing Params

```
RootStack (native-stack)
 ├─ Home ("Cửa hàng")         ← Tab Navigator (headerShown: false)
 │    ├─ Products  → bấm item → navigate("ProductDetails", { id })
 │    └─ Favorites → bấm item → navigate("ProductDetails", { id })
 └─ ProductDetails ("Chi tiết sản phẩm") ← nhận route.params.id
```

- `types.ts`: `Home: NavigatorScreenParams<TabParamList>`; `TabProps` dùng `CompositeScreenProps` để màn trong
  tab gọi được `navigate` của Stack cha mà vẫn đúng kiểu TypeScript.
- `FavoritesContext.tsx`: state `ids`, `toggle` (thêm/bỏ), `has`; `useMemo` + `useCallback` tránh render thừa;
  `useFavorites()` ném lỗi rõ ràng nếu quên bọc Provider (bản đầy đủ có kiểm tra null).
- **TODO 1** `HomeTabs` (icon `phone-portrait-outline`, `heart-outline`) · **TODO 2** `StackTabApp` bọc
  `FavoritesProvider` ngoài `NavigationContainer` · **TODO 3** `ProductsTab` dùng `ProductRow` (component dùng chung)
  · **TODO 4–7** `ProductDetailsScreen`: tìm theo id, báo "Không tìm thấy sản phẩm #id", hiển thị ảnh/tên/sao/giá/nhà
  cung cấp, nút "♡ Lưu vào yêu thích" / "♥ Đã lưu" · **TODO 8** `FavoritesTab` lọc theo `ids`, rỗng →
  "Chưa có sản phẩm nào được lưu."

### 4.5 Bài 5 — Drawer

- **TODO 1 – SettingsScreen:** 2 `Switch` (Nhận thông báo, mặc định BẬT; Chế độ tối, mặc định TẮT) và dòng
  trạng thái "Thông báo: BẬT/TẮT · Giao diện: tối/sáng" cập nhật ngay khi gạt.
- **TODO 2 – DrawerApp:** `drawerIcon` theo tên route (`home-outline / person-outline / settings-outline`),
  `drawerActiveTintColor: colors.red`, title "Trang chủ / Cá nhân / Cài đặt".
- **TODO 3 (nâng cao):** `SettingsContext.tsx` giữ `notify`/`dark`; `usePalette()` trả bảng màu sáng/tối cho nền
  của Home, Profile, Settings; đồng thời `NavigationContainer theme={dark ? DarkTheme : DefaultTheme}` nên header
  và menu Drawer cũng đổi màu theo.

---

## 5. Kiểm tra

### 5.1 Kiểm tra tự động (đã chạy)

| Lệnh | Kết quả |
|------|---------|
| `npm run typecheck` (`tsc --noEmit`) | ✅ Không lỗi |
| `npx expo-doctor` | ✅ 21/21 checks passed |
| `npx expo export --platform web` | ✅ Bundle thành công |
| `npx expo export --platform android` | ✅ Bundle thành công |
| `curl .../api/phones/1` | ✅ HTTP 200, JSON đúng cấu trúc `Phone` |
| `npx expo export --clear --platform web` | ✅ URL mockapi.io được nhúng vào bundle (`USING_API = true`) |

### 5.2 Kịch bản kiểm tra thủ công (theo hướng dẫn — cần chạy trên Expo Go / web)

| Bài | Thao tác | Kết quả mong đợi |
|-----|----------|------------------|
| 1 | Mở Bài 1 | Ảnh xanh, nút "4 MÀU-CHỌN MÀU", nút đỏ "CHỌN MUA" sát đáy (Screen 01) |
| 1 | Bấm nút chọn màu | Sang ChooseColor, chỉ 2 dòng tên (Screen 02) |
| 1 | Chọn ô đỏ | Ô có viền đậm, ảnh nhỏ đỏ, hiện "Màu: đỏ", nhà cung cấp, giá (Screen 03) |
| 1 | Bấm XONG | Về Product: ảnh đỏ lớn, nút "4 MÀU-CHỌN LOẠI" (Screen 04) |
| 2 | Mở Bài 2 | Vòng xoay rồi ra màn Product như Bài 1 |
| 2 | Sửa tên/giá trên mockapi.io, mở lại | Thấy dữ liệu mới |
| 2 | Đặt URL sai / tắt mạng | ErrorBox, bấm THỬ LẠI gọi lại API |
| 3 | Chuyển tab | Icon đổi đặc/viền, tab chọn màu đỏ |
| 3 | Gõ "aris" / "zzz" | Còn 1 kết quả (Aris Pro) / "Không có kết quả cho “zzz”" |
| 4 | Bấm "Vsmart Live 4" | Chi tiết id=2, giá 3.990.000 đ |
| 4 | Bấm ♡, sang tab Yêu thích | Sản phẩm xuất hiện; bỏ ♥ → danh sách rỗng trở lại |
| 5 | Vuốt mép trái / bấm ☰ | Menu 3 mục, mục đang chọn tô đỏ |
| 5 | Gạt Switch | Dòng trạng thái đổi ngay; bật "Chế độ tối" → Home/Profile/header đổi nền tối |

---

## 6. Giao diện theo Figma (Bài 1 & 2)

4 màn Select Phone được dựng lại theo ảnh thiết kế trong thư mục `figma/` (`Untitled.png` = 4 màn,
`blue/red/black/white.png` = 4 sản phẩm). Khung Figma rộng 250 px trên ảnh ↔ màn 360 × 640 dp (hệ số 1.44).

**Ảnh sản phẩm** — cắt từ `figma/*.png` (ảnh nằm ở góc trái canvas 1332 × 540):
nền xám canvas `#E5E5E5` được loang từ mép ảnh → chuyển trong suốt, rồi cắt sát thân máy (≈ 193 × 241 px).
`white.png` dùng làm màu `silver` (ô màu xanh nhạt đầu tiên).

| Ảnh Figma | File trong app |
|-----------|----------------|
| `figma/blue.png` | `assets/phones/blue.png` |
| `figma/red.png` | `assets/phones/red.png` |
| `figma/black.png` | `assets/phones/black.png` |
| `figma/white.png` | `assets/phones/silver.png` |

**Màu đo trực tiếp từ ảnh thiết kế** (`src/theme.ts`, `src/data/phones.ts`):

| Thành phần | Màu |
|------------|-----|
| Nút CHỌN MUA | `#EE0A0A` |
| Nút XONG (nền / viền) | `#4D6EC2` / `#CA1536` |
| Sao đánh giá | `#E0E41A` |
| Chữ huy hiệu | `#FA0000` |
| 4 ô màu (bạc, đỏ, đen, xanh) | `#C5F1FB`, `#F30D0D`, `#000000`, `#234896` |
| Nền nửa dưới ChooseColor | `#C4C4C4` |
| Chữ, giá bán | `#000000` (giá bán màu đen đậm như thiết kế) |

**Kích thước chính (dp):**

| Màn | Thành phần | Kích thước / vị trí |
|-----|------------|---------------------|
| Product | Ảnh lớn | tối đa 265 × 330, canh giữa, cách đỉnh 12 |
| Product | Lề hai bên | 20 |
| Product | Sao | cỡ 24, có khoảng hở giữa các sao |
| Product | Nút "4 MÀU-CHỌN MÀU" | cao 34, bo 10, viền xám, đổ bóng, `>` cách phải 14 |
| Product | Nút "CHỌN MUA" | cao 44, bo 10, cách đáy 13, chữ 20 đậm |
| ChooseColor | Nửa trên (trắng) | cao 149; ảnh nhỏ 97 × 121 tại (11, 6) |
| ChooseColor | Ô màu | 85 × 80, cách nhau 12, có đổ bóng |
| ChooseColor | Nút "XONG" | cao 42, bo 10, lề 17, cách đáy 11 |

> Thiết kế Figma không vẽ viền cho ô đang chọn, nhưng hướng dẫn Lab yêu cầu "ô có viền đậm" khi chọn,
> nên ô đang chọn vẫn có viền navy 3 dp.

Đã kiểm tra bằng cách render 4 trạng thái (Screen 01–04) trên web ở khung 360 × 640 và đối chiếu với ảnh Figma.
Bài 3, 4 dùng chung ảnh sản phẩm mới qua `PHONE_COLORS`.

---

## 7. Ghi chú
- **Dữ liệu 6 sản phẩm:** hướng dẫn chỉ cho chi tiết Joy 3 (id 1) và giá Live 4 (3.990.000 đ, id 2);
  các sản phẩm còn lại (Star 5, Active 3, Aris Pro, Bee 3) dùng giá/đánh giá giả định.
- **mockapi.io:** endpoint `https://6acb4860ef37b1504077b3fc.mockapi.io/api` được cấu hình trong `.env`.
  Khi đổi URL phải khởi động lại bằng `npx expo start -c` — nếu không xóa cache, Metro có thể giữ bundle cũ
  chưa có biến môi trường (đã gặp khi kiểm tra: build không `--clear` vẫn ra chế độ offline).
