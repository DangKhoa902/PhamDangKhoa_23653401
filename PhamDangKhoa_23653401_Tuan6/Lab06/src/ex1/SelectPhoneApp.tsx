import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ColorKey, Phone } from "../types";
import { ProductScreen } from "./ProductScreen";
import { ChooseColorScreen } from "./ChooseColorScreen";

// Khai báo tham số của từng màn trong Stack:
// cả 2 màn đều có thể nhận màu (color) hoặc không nhận gì (undefined)
export type SelectPhoneParamList = {
  Product: { color?: ColorKey } | undefined;
  ChooseColor: { color?: ColorKey } | undefined;
};
// Tạo Stack Navigator có kiểu tham số ở trên
const Stack = createNativeStackNavigator<SelectPhoneParamList>();

// Ứng dụng Select Phone: Stack gồm 2 màn Product ↔ ChooseColor
// `phone` được truyền từ ngoài vào (dữ liệu mẫu ở Bài 1, dữ liệu API ở Bài 2)
export function SelectPhoneApp({ phone }: { phone: Phone }) {
  return (
    <NavigationContainer>
      {/* headerShown:false → ẩn thanh tiêu đề vì thiết kế không có header */}
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* Dùng render callback để truyền thêm prop `phone` cho màn hình */}
        <Stack.Screen name="Product">
          {(props) => <ProductScreen {...props} phone={phone} />}
        </Stack.Screen>
        <Stack.Screen name="ChooseColor">
          {(props) => <ChooseColorScreen {...props} phone={phone} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
