import React, { useState } from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import { Header } from '../components/Header';
import { CategoryChips } from '../components/CategoryChips';
import { BookGrid } from '../components/BookGrid';
import { FloatingCartButton } from '../components/FloatingCartButton';
import { BOOKS } from '../../data';

export default function App() {
  const [cartCount, setCartCount] = useState(0);

  // Hàm tăng số lượng sản phẩm trong giỏ hàng
  const handleAddToCart = () => {
    setCartCount((prevCount) => prevCount + 1);
  };

  return (
    <View style={styles.screen}>
      {/* 1. Header cố định trên cùng */}
      <Header />

      {/* 2. ScrollView chứa Chips + Grid */}
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Category</Text>
        </View>
        <CategoryChips />

        <View style={[styles.sectionHeader, { marginTop: 24 }]}>
          <Text style={styles.sectionTitle}>Popular Books</Text>
        </View>
        <BookGrid books={BOOKS} onPressBook={handleAddToCart} />
      </ScrollView>

      {/* 3. Nút giỏ nổi — NGOÀI ScrollView */}
      <FloatingCartButton count={cartCount} onPress={() => { handleAddToCart(); }} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#F8FAFC' },
  content: { padding: 16, paddingBottom: 100 },
  sectionHeader: {
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0F172A',
    letterSpacing: 0.3,
  },
});