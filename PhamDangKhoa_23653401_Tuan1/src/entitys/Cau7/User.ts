export class User {
    // Khai báo thuộc tính private
    private _name: string;
  
    constructor(name: string) {
      this._name = name;
    }
  
    // Getter: Dùng để truy cập thuộc tính name
    get name(): string {
      return this._name;
    }
  
    // Setter: Dùng để cập nhật thuộc tính name với validation
    set name(newName: string) {
      if (newName.trim().length === 0) {
        console.log("Tên không được để trống!");
        return;
      }
      this._name = newName;
    }
  }
  