abstract class Appliance {
    abstract turnOn(): void;
  }
  
  class Fan extends Appliance {
    turnOn(): void {
      console.log("Quạt đang quay...");
    }
  }
  
  class AirConditioner extends Appliance {
    turnOn(): void {
      console.log("Điều hòa đang làm mát...");
    }
  }