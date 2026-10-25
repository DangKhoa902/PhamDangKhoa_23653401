import React, { useCallback, useEffect, useState } from "react";
import { fetchPhone } from "../api/phoneApi";
import { Phone } from "../types";
import { ErrorBox } from "../components/ErrorBox";
import { Loading } from "../components/Loading";
import { SelectPhoneApp } from "./SelectPhoneApp";

// Bài 2: Select Phone lấy dữ liệu từ API (mockapi.io) thay cho dữ liệu viết cứng
export function SelectPhoneApi() {
  // Sản phẩm tải về (null = chưa có / đang tải)
  const [phone, setPhone] = useState<Phone | null>(null);
  // Thông điệp lỗi (null = không lỗi)
  const [error, setError] = useState<string | null>(null);

  // Hàm tải dữ liệu; useCallback để giữ nguyên tham chiếu, dùng được cho cả useEffect và nút THỬ LẠI
  const load = useCallback(async () => {
    // TODO 1: xóa lỗi cũ và dữ liệu cũ → giao diện quay về trạng thái loading
    setError(null);
    setPhone(null);
    // TODO 2: gọi API; thành công thì lưu sản phẩm, thất bại thì lưu thông điệp lỗi
    try {
      setPhone(await fetchPhone("1"));
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    }
  }, []);

  // TODO 3: gọi load() một lần khi màn hình mở lần đầu
  useEffect(() => {
    load();
  }, [load]);

  // TODO 4: có lỗi → hiện hộp lỗi kèm nút THỬ LẠI (gọi lại load)
  if (error) return <ErrorBox message={error} onRetry={load} />;
  // TODO 5: chưa có dữ liệu → hiện vòng xoay "Đang tải..."
  if (!phone) return <Loading />;
  // TODO 6: đã có dữ liệu → dùng lại toàn bộ ứng dụng của Bài 1
  return <SelectPhoneApp phone={phone} />;
}
