class Employee {
    constructor(public name: string, public salary: number) {}
}

class Manager extends Employee {
manageTeam(): void {
    console.log(`${this.name} đang quản lý đội ngũ.`);
}
}

class Developer extends Employee {
writeCode(): void {
    console.log(`${this.name} đang viết code TypeScript.`);
}
}