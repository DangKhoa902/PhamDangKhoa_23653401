import type { Animal } from "../../interface/Animal";

export class Dog implements Animal {
    constructor(public name: string) {}
  
    sound(): void {
      console.log(`${this.name} kêu: Gâu gâu!`);
    }
  }