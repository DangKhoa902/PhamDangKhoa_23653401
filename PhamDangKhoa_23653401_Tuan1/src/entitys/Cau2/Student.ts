import { Person } from "../Cau1/Person";

export class Student extends Person{
    grade : number;

    // Constructor để khởi tạo giá trị
    constructor(name: string, age: number, grade : number) {
        super(name , age);
        this.grade = grade;
      }

    // Phương thức hiển thị thông tin
    displayInfo(): void {
        console.log(`Tên: ${this.name}, Tuổi: ${this.age}, Điểm: ${this.grade}`);
      }
}