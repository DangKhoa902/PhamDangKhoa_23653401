class Animal {
    constructor(public name: string) {}
  }
  
  class Dog extends Animal {
    bark(): void {
      console.log(`${this.name} sủa: Gâu gâu!`);
    }
  }
  
  class Cat extends Animal {
    meow(): void {
      console.log(`${this.name} kêu: Meo meo!`);
    }
  }