import type { Animal } from "../../interface/Animal";

export class Cat implements Animal {
    constructor(public name: string) {}
  
    sound(): void {
      console.log(`${this.name} kêu: Meo meo!`);
    }
  }