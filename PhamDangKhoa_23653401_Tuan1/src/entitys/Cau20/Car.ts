import type { Vehicle } from "../../interface/Vehicle";

class Car implements Vehicle {
    constructor(public brand: string, public speed: number) {}
  
    drive(): void {
      console.log(`Ô tô ${this.brand} đang chạy với tốc độ ${this.speed} km/h`);
    }
  }