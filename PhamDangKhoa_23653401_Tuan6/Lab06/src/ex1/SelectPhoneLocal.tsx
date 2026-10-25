import React from "react";
import { PHONES } from "../data/phones";
import { SelectPhoneApp } from "./SelectPhoneApp";

// Bài 1: Select Phone với dữ liệu viết cứng (sản phẩm đầu tiên — Vsmart Joy 3)
export function SelectPhoneLocal() {
  return <SelectPhoneApp phone={PHONES[0]} />;
}
