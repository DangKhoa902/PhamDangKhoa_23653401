// Các kiểu dữ liệu dùng chung cho toàn bộ Lab 06

// 4 màu điện thoại có trong thiết kế (khóa dùng để tra bảng màu PHONE_COLORS)
export type ColorKey = "silver" | "red" | "black" | "blue";

// Thông tin một sản phẩm điện thoại (cũng là cấu trúc JSON trả về từ mockapi.io)
export interface Phone {
  id: string; // mã sản phẩm (mockapi.io trả id dạng chuỗi)
  name: string; // tên đầy đủ, dạng "Tên máy - Hàng chính hãng"
  price: number; // giá bán hiện tại (VNĐ)
  oldPrice: number; // giá cũ (hiển thị gạch ngang)
  rating: number; // số sao đánh giá 0..5
  reviewCount: number; // số lượt đánh giá
  supplier: string; // nhà cung cấp
  badge: string; // dòng huy hiệu khuyến mãi
  colors: ColorKey[]; // danh sách màu máy có
  defaultColor: ColorKey; // màu hiển thị khi người dùng chưa chọn
}
