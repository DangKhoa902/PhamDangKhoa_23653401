abstract class Shape {
    abstract area(): number; // Method trừu tượng, không có thân hàm
  }
  
class Square extends Shape {
constructor(public side: number) {
    super();
}

area(): number {
    return this.side * this.side;
}
}

class Circle extends Shape {
constructor(public radius: number) {
    super();
}

area(): number {
    return Math.PI * this.radius * this.radius;
}
}