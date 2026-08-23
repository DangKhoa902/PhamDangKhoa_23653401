export class MathUtil {
    static add(a: number, b: number): number {
      return a + b;
    }
  
    static subtract(a: number, b: number): number {
      return a - b;
    }
  
    static multiply(a: number, b: number): number {
      return a * b;
    }
  
    static divide(a: number, b: number): number {
      if (b === 0) throw new Error("Không thể chia cho 0");
      return a / b;
    }
  }