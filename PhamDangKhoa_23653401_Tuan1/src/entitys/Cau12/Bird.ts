import type { Flyable } from "../../interface/Flyable";

export class Bird implements Flyable {
    fly(): void {
      console.log("Chim đang bay trên trời");
    }
  }