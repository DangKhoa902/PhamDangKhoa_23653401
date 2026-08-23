class Book {
    constructor(public title: string, public author: string) {}
}

class User {
    constructor(public name: string) {}
}

class Library {
private books: Book[] = [];
private users: User[] = [];

addBook(book: Book): void {
    this.books.push(book);
    console.log(`Đã thêm sách: ${book.title}`);
}

addUser(user: User): void {
    this.users.push(user);
}
}