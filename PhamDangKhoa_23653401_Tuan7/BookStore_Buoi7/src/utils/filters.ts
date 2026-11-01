import { Book } from "../types";

// Bỏ dấu tiếng Việt để "nha gia kim" vẫn tìm ra "Nhà Giả Kim"  (ĐÃ VIẾT SẴN — chỉ cần gọi)
export const normalize = (s: string) =>
  s.normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/đ/g, "d").replace(/Đ/g, "D").toLowerCase().trim();

export type PriceRange = "lt100" | "100to300" | "gt300" | null;

export const PRICE_RANGES: { key: Exclude<PriceRange, null>; label: string }[] = [
  { key: "lt100", label: "Dưới 100k" },
  { key: "100to300", label: "100k–300k" },
  { key: "gt300", label: "Trên 300k" },
];

// Giá có nằm trong khoảng r không (null = không lọc)
const inRange = (price: number, r: PriceRange): boolean => {
  switch (r) {
    case null:
      return true;
    case "lt100":
      return price < 100000;
    case "100to300":
      return price >= 100000 && price <= 300000;
    case "gt300":
      return price > 300000;
  }
};

export interface BookFilter {
  keyword: string;
  categoryId: number | null;
  priceRange: PriceRange;
}

// Lọc KẾT HỢP: từ khoá (tên/tác giả) + danh mục + khoảng giá
export function filterBooks(books: Book[], f: BookFilter): Book[] {
  const keyword = normalize(f.keyword);

  const matchKeyword = (b: Book) =>
    keyword === "" || normalize(b.title).includes(keyword) || normalize(b.author).includes(keyword);
  const matchCategory = (b: Book) => f.categoryId === null || b.categoryId === f.categoryId;

  return books.filter((b) => matchKeyword(b) && matchCategory(b) && inRange(b.price, f.priceRange));
}
