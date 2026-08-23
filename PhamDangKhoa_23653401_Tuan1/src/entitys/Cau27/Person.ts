class Person {
    constructor(public name: string, public age: number) {}
  }
  
  class Teacher extends Person {
    constructor(name: string, age: number, public subject: string) {
      super(name, age);
    }
  
    introduce(): void {
      console.log(`Xin chào, tôi tên là ${this.name}, dạy môn ${this.subject}.`);
    }
  }