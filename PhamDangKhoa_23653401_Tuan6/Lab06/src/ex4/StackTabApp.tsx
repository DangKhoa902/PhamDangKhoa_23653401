import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../theme";
import { FavoritesProvider } from "./FavoritesContext";
import { ProductsTab } from "./ProductsTab";
import { FavoritesTab } from "./FavoritesTab";
import { ProductDetailsScreen } from "./ProductDetailsScreen";
import type { RootStackParamList, TabParamList } from "./types";

// Stack gốc và Tab lồng bên trong màn Home
const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

// TODO 1: Tab Navigator gồm Products và Favorites (là nội dung của màn "Home")
function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false, // header đã do Stack cha hiển thị ("Cửa hàng") → ẩn header của tab
        tabBarActiveTintColor: colors.red,
      }}
    >
      <Tab.Screen
        name="Products"
        component={ProductsTab}
        options={{
          title: "Sản phẩm",
          tabBarIcon: ({ color, size }) => <Ionicons name="phone-portrait-outline" size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="Favorites"
        component={FavoritesTab}
        options={{
          title: "Yêu thích",
          tabBarIcon: ({ color, size }) => <Ionicons name="heart-outline" size={size} color={color} />,
        }}
      />
    </Tab.Navigator>
  );
}

// TODO 2: Stack gốc — Home (chứa Tab) và ProductDetails; bọc FavoritesProvider ngoài cùng
export function StackTabApp() {
  return (
    <FavoritesProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeTabs} options={{ title: "Cửa hàng" }} />
          <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} options={{ title: "Chi tiết sản phẩm" }} />
        </Stack.Navigator>
      </NavigationContainer>
    </FavoritesProvider>
  );
}
