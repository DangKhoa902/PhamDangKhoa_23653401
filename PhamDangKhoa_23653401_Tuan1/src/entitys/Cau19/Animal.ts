class Animal {
    makeSound(): void {
      console.log("Động vật tạo âm thanh...");
    }
  }
  
  class Dog extends Animal {
    // Ghi đè (override) phương thức của lớp cha
    makeSound(): void {
      console.log("Gâu gâu!");
    }
  }
  
  class Cat extends Animal {
    makeSound(): void {
      console.log("Meo meo!");
    }
  }
  
  // Thể hiện tính đa hình (Polymorphism)
  const animals: Animal[] = [new Dog(), new Cat(), new Animal()];
  animals.forEach((animal) => animal.makeSound());