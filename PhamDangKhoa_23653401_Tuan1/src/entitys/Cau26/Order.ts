interface ProductItem {
    name: string;
    price: number;
  }
  
  class Order {
    private products: ProductItem[] = [];
  
    addProduct(product: ProductItem): void {
      this.products.push(product);
    }
  
    calculateTotal(): number {
      return this.products.reduce((total, item) => total + item.price, 0);
    }
  }