export class Car {
    // Khai báo thuộc tính với kiểu dữ liệu
    brand: string;
    model: string;
    year: number
  
    // Constructor để khởi tạo giá trị
    constructor(brand: string, model: string, year : number) {
        this.brand = brand;
        this.model = model;
        this.year = year;

      }
  
    // Phương thức hiển thị thông tin
    displayInfo(): void {
      console.log(`Xe: ${this.brand}, Model: ${this.model}, Năm: ${this.year}`);
    }


  }