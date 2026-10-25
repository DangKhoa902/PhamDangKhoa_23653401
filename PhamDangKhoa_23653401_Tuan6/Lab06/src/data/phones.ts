import { ColorKey, Phone } from "../types";

// Bảng màu: tên tiếng Việt, mã màu của ô chọn (đo từ Figma), và ảnh điện thoại tương ứng
// Ảnh được cắt từ thư mục figma/ (nền xám canvas đã chuyển trong suốt)
// require() trả về một số (id tài nguyên) nên kiểu của image là number
export const PHONE_COLORS: Record<ColorKey, { label: string; hex: string; image: number }> = {
  silver: { label: "bạc", hex: "#C5F1FB", image: require("../../assets/phones/silver.png") },
  red: { label: "đỏ", hex: "#F30D0D", image: require("../../assets/phones/red.png") },
  black: { label: "đen", hex: "#000000", image: require("../../assets/phones/black.png") },
  blue: { label: "xanh", hex: "#234896", image: require("../../assets/phones/blue.png") },
};

// Tỉ lệ rộng / cao của ảnh điện thoại sau khi cắt (≈ 193 × 241 px)
export const PHONE_IMAGE_RATIO = 193 / 241;

// Thứ tự 4 ô màu hiển thị trên màn ChooseColor (từ trên xuống)
export const COLOR_ORDER: ColorKey[] = ["silver", "red", "black", "blue"];

// Huy hiệu khuyến mãi dùng chung cho các sản phẩm
const BADGE = "Ở ĐÂU RẺ HƠN HOÀN TIỀN";

// Dữ liệu mẫu offline (6 sản phẩm) — dùng cho Bài 1, 3, 4 và cho Bài 2 khi chưa cấu hình API
export const PHONES: Phone[] = [
  {
    id: "1", name: "Điện Thoại Vsmart Joy 3 - Hàng chính hãng", price: 1790000, oldPrice: 1790000,
    rating: 5, reviewCount: 828, supplier: "Tiki Tradding", badge: BADGE,
    colors: COLOR_ORDER, defaultColor: "blue",
  },
  {
    id: "2", name: "Điện Thoại Vsmart Live 4 - Hàng chính hãng", price: 3990000, oldPrice: 4490000,
    rating: 4, reviewCount: 512, supplier: "Tiki Tradding", badge: BADGE,
    colors: COLOR_ORDER, defaultColor: "black",
  },
  {
    id: "3", name: "Điện Thoại Vsmart Star 5 - Hàng chính hãng", price: 2290000, oldPrice: 2590000,
    rating: 4, reviewCount: 301, supplier: "Vsmart Official", badge: BADGE,
    colors: COLOR_ORDER, defaultColor: "red",
  },
  {
    id: "4", name: "Điện Thoại Vsmart Active 3 - Hàng chính hãng", price: 2990000, oldPrice: 3490000,
    rating: 5, reviewCount: 1024, supplier: "Tiki Tradding", badge: BADGE,
    colors: COLOR_ORDER, defaultColor: "silver",
  },
  {
    id: "5", name: "Điện Thoại Vsmart Aris Pro - Hàng chính hãng", price: 8490000, oldPrice: 9990000,
    rating: 5, reviewCount: 215, supplier: "Vsmart Official", badge: BADGE,
    colors: COLOR_ORDER, defaultColor: "black",
  },
  {
    id: "6", name: "Điện Thoại Vsmart Bee 3 - Hàng chính hãng", price: 1290000, oldPrice: 1490000,
    rating: 3, reviewCount: 97, supplier: "Tiki Tradding", badge: BADGE,
    colors: COLOR_ORDER, defaultColor: "blue",
  },
];
