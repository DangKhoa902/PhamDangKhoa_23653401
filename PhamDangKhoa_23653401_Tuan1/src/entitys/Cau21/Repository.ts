export class Repository<T> {
    private items: T[] = [];
  
    add(item: T): void {
      this.items.push(item);
    }
  
    getAll(): T[] {
      return this.items;
    }
  }
  
  // Thử nghiệm
  const userRepo = new Repository<{ id: number; name: string }>();
  userRepo.add({ id: 1, name: "An" });
  console.log(userRepo.getAll());