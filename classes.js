class Book {
    constructor(name, author, pages, read) {
        this.id = crypto.randomUUID();
        this.name = name;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }

    toggleRead() {
        this.read = !this.read;
    }
}

class Library {
    constructor() {
        this.books = [];
    }

    addBook(book) {
        this.books.add(book);
    }

    deleteBook(id) {
        this.books = this.books.filter(book => book.id !== id);
    }

    getBooks() {
        return this.books;
    }
}
