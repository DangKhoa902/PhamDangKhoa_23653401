import { useEffect } from 'react';
import './App.css'
import { Person } from './entitys/Cau1/Person'
import { Student } from './entitys/Cau2/Student';
import { Car } from './entitys/Cau3/Car';
import { Rectangle } from './entitys/Cau4/Rectangle';
import { BankAccount } from './entitys/Cau5/BankAccount';
import { User } from './entitys/Cau7/User';
import type { Animal } from './interface/Animal';
import { Dog } from './entitys/Cau9/Dog';
import { Cat } from './entitys/Cau9/Cat';
import { Box } from './entitys/Cau16/Box';
import { Logger } from './entitys/Cau17/Logger';
import { MathUtil } from './entitys/Cau18/MathUtil';
import { Repository } from './entitys/Cau21/Repository';

function App() {

  // Kiểm tra hoạt động
  //Câu 1---------------------------------
  // const person1 = new Person("Nguyễn Văn A", 20);
  // person1.displayInfo();

  //Câu 2---------------------------------
  // const student1 = new Student("Nguyễn Thị T", 18, 9);
  // student1.displayInfo();
  
  //Câu 3---------------------------------
  // const car1 = new Car("VFI", "Xe hộp", 2021);
  // car1.displayInfo();

  //Câu 4---------------------------------
  // const rectangle = new Rectangle(12, 4);
  // console.log("Area : " + rectangle.getArea());
  // console.log("Perimeter : " + rectangle.getPerimeter());
  
    //Câu 5---------------------------------
  // const myAccount = new BankAccount(100);

  // myAccount.deposit(50);   // Đã gửi: 50. Số dư hiện tại: 150
  // myAccount.withdraw(30);  // Đã rút: 30. Số dư còn lại: 120
  // myAccount.withdraw(200); // Rút tiền thất bại! Số dư không đủ (Hiện có: 120)

    
  // Câu 7---------------------------------
  // const user = new User("Alice");
  
  // // Gọi Getter (truy cập như một thuộc tính bình thường, không dùng dấu `()`)
  // console.log(user.name); // Output: Alice
  
  // // Gọi Setter để cập nhật tên
  // user.name = "Bob";
  // console.log(user.name); // Output: Bob
  
  // // Thử gán giá trị không hợp lệ
  // user.name = "   "; // Output: Tên không được để trống!

  //Câu 8 ---------------------------------
  // class Product {
  //   constructor(public name: string, public price: number) {}
  // }
  
  // // 1. Tạo danh sách (array) các sản phẩm
  // const products: Product[] = [
  //   new Product("Bàn phím cơ", 150),
  //   new Product("Chuột máy tính", 45),
  //   new Product("Màn hình 4K", 350),
  //   new Product("Lót chuột", 15),
  //   new Product("Tai nghe", 120),
  // ];
  
  // // 2. Sử dụng hàm filter để lọc các sản phẩm có giá > 100
  // const expensiveProducts = products.filter((product) => product.price > 100);
  
  // // In kết quả
  // console.log("Danh sách sản phẩm có giá > 100:");
  // console.log(expensiveProducts);


  //Câu 9---------------------------------
  // const myDog: Animal = new Dog("Gâu Đần");
  // const myCat: Animal = new Cat("Mèo Méo");

  // myDog.sound(); // Output: Gâu Đần kêu: Gâu gâu!
  // myCat.sound(); // Output: Mèo Méo kêu: Meo meo!


    
  // Câu 16
  // const numberBox = new Box<number>(100);
  // const stringBox = new Box<string>("Hello TypeScript");
  // console.log(numberBox);
  // console.log(stringBox);

  //Câu 17
  // const logger1 = Logger.getInstance();
  // logger1.log("Hệ thống khởi chạy thành công");

  //Câu 18
  // console.log(MathUtil.add(10, 5));

  //Câu 21
  const userRepo = new Repository<{ id: number; name: string }>();
  userRepo.add({ id: 1, name: "An" });
  console.log(userRepo.getAll());

  return (
    <>
        <h2>Hãy bấm F12 để có thể xem kết quả chương trình</h2>
    </>
  )
}

export default App
