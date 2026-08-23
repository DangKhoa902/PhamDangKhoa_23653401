export class BankAccount {
    // Dùng private để bảo vệ số dư, tránh bị sửa đổi trực tiếp từ bên ngoài
    private balance: number;
  
    constructor(initialBalance: number = 0) {
      this.balance = initialBalance;
    }
  
    // Phương thức gửi tiền
    deposit(amount: number): void {
      if (amount > 0) {
        this.balance += amount;
        console.log(`Đã gửi: ${amount}. Số dư hiện tại: ${this.balance}`);
      } else {
        console.log("Số tiền gửi phải lớn hơn 0!");
      }
    }
  
    // Phương thức rút tiền
    withdraw(amount: number): void {
      if (amount <= 0) {
        console.log("Số tiền rút phải lớn hơn 0!");
      } else if (amount > this.balance) {
        console.log(`Rút tiền thất bại! Số dư không đủ (Hiện có: ${this.balance})`);
      } else {
        this.balance -= amount;
        console.log(`Đã rút: ${amount}. Số dư còn lại: ${this.balance}`);
      }
    }
  
    // Getter để xem số dư an toàn
    getBalance(): number {
      return this.balance;
    }
  }
  
