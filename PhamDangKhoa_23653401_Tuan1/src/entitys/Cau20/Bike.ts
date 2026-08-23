import type { Vehicle } from "../../interface/Vehicle";

class Bike implements Vehicle {
    constructor(public brand: string, public speed: number) {}
  
    drive(): void {
      console.log(`Xe máy ${this.brand} đang chạy với tốc độ ${this.speed} km/h`);
    }
  }