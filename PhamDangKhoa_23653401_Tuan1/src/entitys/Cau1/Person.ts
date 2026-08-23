export class Person {
    // Khai báo thuộc tính với kiểu dữ liệu
    name: string;
    age: number;
  
    // Constructor để khởi tạo giá trị
    constructor(name: string, age: number) {
      this.name = name;
      this.age = age;
    }
  
    // Phương thức hiển thị thông tin
    displayInfo(): void {
      console.log(`Tên: ${this.name}, Tuổi: ${this.age}`);
    }


  }