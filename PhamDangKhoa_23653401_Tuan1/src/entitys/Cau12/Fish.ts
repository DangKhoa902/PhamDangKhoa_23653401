import type { Swimmable } from "../../interface/Swimable";

export class Fish implements Swimmable {
    swim(): void {
      console.log("Cá đang bơi dưới nước");
    }
  }