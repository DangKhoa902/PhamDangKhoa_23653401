class Student {
    constructor(public name: string) {}
  }
  
  class Teacher {
    constructor(public name: string, public subject: string) {}
  }
  
  class School {
    private students: Student[] = [];
    private teachers: Teacher[] = [];
  
    addStudent(student: Student): void {
      this.students.push(student);
    }
  
    addTeacher(teacher: Teacher): void {
      this.teachers.push(teacher);
    }
  
    displayInfo(): void {
      console.log("--- Danh sách Giáo viên ---");
      this.teachers.forEach((t) => console.log(`- ${t.name} (${t.subject})`));
      console.log("--- Danh sách Học sinh ---");
      this.students.forEach((s) => console.log(`- ${s.name}`));
    }
  }