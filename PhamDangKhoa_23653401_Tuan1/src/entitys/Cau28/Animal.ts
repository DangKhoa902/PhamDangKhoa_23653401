class Animal {
    protected makeSound(): void {
      console.log("Âm thanh động vật...");
    }
  }
  
  class Dog extends Animal {
    public bark(): void {
      // Có thể gọi phương thức protected từ class con
      this.makeSound(); 
      console.log("Gâu gâu!");
    }
  
    protected override makeSound(): void {
      console.log("Chó phát ra âm thanh");
    }
  }