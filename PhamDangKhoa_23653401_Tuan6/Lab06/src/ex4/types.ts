import type { NavigatorScreenParams, CompositeScreenProps } from "@react-navigation/native";
import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

// Tham số các tab bên trong màn Home
export type TabParamList = { Products: undefined; Favorites: undefined };

// Tham số các màn của Stack gốc:
// - Home là một navigator lồng (Tab) → dùng NavigatorScreenParams
// - ProductDetails bắt buộc nhận id sản phẩm
export type RootStackParamList = {
  Home: NavigatorScreenParams<TabParamList>;
  ProductDetails: { id: string };
};

// Props cho màn thuộc Stack gốc
export type RootProps<T extends keyof RootStackParamList> = NativeStackScreenProps<RootStackParamList, T>;

// Props cho màn thuộc Tab: gộp (Composite) navigation của Tab với navigation của Stack cha
// → từ trong tab vẫn gọi được navigate("ProductDetails", { id }) mà vẫn đúng kiểu
export type TabProps<T extends keyof TabParamList> = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, T>,
  NativeStackScreenProps<RootStackParamList>
>;
