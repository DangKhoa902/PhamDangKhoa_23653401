// Bảng màu chung — đo trực tiếp từ ảnh thiết kế Figma (figma/Untitled.png)
export const colors = {
  red: "#EE0A0A", // nút "CHỌN MUA", tab/mục đang chọn
  badgeRed: "#FA0000", // chữ huy hiệu "Ở ĐÂU RẺ HƠN HOÀN TIỀN"
  blue: "#4D6EC2", // nền nút "XONG"
  blueBorder: "#CA1536", // viền mảnh màu đỏ sẫm quanh nút "XONG"
  navy: "#0B1F5C", // viền ô màu đang chọn
  black: "#000000", // chữ chính trong thiết kế Select Phone
  text: "#1F2430", // chữ chính ở các bài khác
  muted: "#6B7280", // chữ phụ (mờ)
  oldPrice: "#555555", // giá cũ gạch ngang
  line: "#D8DCE3", // đường viền, sao rỗng
  bg: "#F4F5F7", // nền xám nhạt
  grey: "#C4C4C4", // nền nửa dưới màn ChooseColor
  star: "#E0E41A", // sao vàng
};

// Đổ bóng nhẹ dùng cho các nút/ô màu trong thiết kế (iOS dùng shadow*, Android dùng elevation)
export const shadow = {
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.25,
  shadowRadius: 2,
  elevation: 3,
};

// Định dạng giá kiểu Việt Nam: 1790000 -> "1.790.000 đ"
// Regex chèn dấu "." trước mỗi nhóm 3 chữ số tính từ bên phải
export const formatPrice = (n: number) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " đ";
