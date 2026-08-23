export class Rectangle {
    // Khai báo thuộc tính với kiểu dữ liệu
    width : number;
    height : number;

  
    // Constructor để khởi tạo giá trị
    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;

      }


  
    // Phương thức tính diện tích
    // Công thức là dài * rộng
    getArea(): Number {
      return this.width * this.height;
    }

    //Công thức tính chu vi
    // chu vi hình chữ nhật  = 2* dài + 2* rộng
    getPerimeter() : Number{
        return 2 * this.width + 2*this.height;
    }
  }