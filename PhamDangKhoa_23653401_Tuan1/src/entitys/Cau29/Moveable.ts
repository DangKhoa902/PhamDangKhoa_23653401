interface Movable {
    move(): void;
  }
  
  class Car implements Movable {
    move(): void {
      console.log("Xe ô tô di chuyển bằng 4 bánh.");
    }
  }
  
  class Robot implements Movable {
    move(): void {
      console.log("Robot di chuyển bằng khớp cơ khí.");
    }
  }