import type { Payment } from "../../interface/Payment";

class CashPayment implements Payment {
    pay(amount: number): void {
      console.log(`Thanh toán tiền mặt: ${amount} VNĐ`);
    }
  }

  class CardPayment implements Payment {
    constructor(private cardNumber: string) {}
  
    pay(amount: number): void {
      console.log(`Thanh toán ${amount} VNĐ qua thẻ ${this.cardNumber}`);
    }
  }