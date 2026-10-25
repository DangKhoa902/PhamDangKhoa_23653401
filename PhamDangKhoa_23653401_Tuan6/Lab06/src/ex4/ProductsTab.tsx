import React from "react";
import { FlatList } from "react-native";
import { PHONES } from "../data/phones";
import { ProductRow } from "./ProductRow";
import type { TabProps } from "./types";

// Tab1 — danh sách sản phẩm
export function ProductsTab({ navigation }: TabProps<"Products">) {
  // TODO 3: FlatList các sản phẩm; bấm một dòng → mở ProductDetails kèm id
  return (
    <FlatList
      data={PHONES}
      keyExtractor={(p) => p.id}
      contentContainerStyle={{ padding: 16, gap: 10 }}
      renderItem={({ item }) => (
        // navigate lên Stack cha (nhờ CompositeScreenProps) và truyền params { id }
        <ProductRow phone={item} onPress={() => navigation.navigate("ProductDetails", { id: item.id })} />
      )}
    />
  );
}
