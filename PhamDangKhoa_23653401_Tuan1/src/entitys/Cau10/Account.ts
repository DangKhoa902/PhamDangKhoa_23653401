class Account {
    public accountNumber: string;    // Truy cập tự do
    private balance: number;         // Chỉ truy cập nội bộ trong class
    readonly createdAt: Date;        // Chỉ đọc, không sửa đổi sau khi khởi tạo
  
    constructor(accountNumber: string, initialBalance: number) {
      this.accountNumber = accountNumber;
      this.balance = initialBalance;
      this.createdAt = new Date();
    }
  
    public getBalance(): number {
      return this.balance;
    }
  }