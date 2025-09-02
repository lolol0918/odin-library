const form = document.getElementById("bookForm");
const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");
const pagesInput = document.getElementById("pages");
const readInput = document.getElementById("read");
const modal = document.getElementById("bookModal");
const openBtn = document.getElementById("openModalBtn");
const closeBtn = document.querySelector(".closeBtn");



const myLibrary = [];

function Book(name, author, pages, read) {
    this.id = crypto.randomUUID();
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(book) {
    // take params, create a book then store it in the array
    myLibrary.push(book);
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const newBook = new Book(
        titleInput.value,
        authorInput.value,
        pagesInput.value,
        readInput.value
    );

    addBookToLibrary(newBook);

    form.reset();
});

openBtn.addEventListener('click', () => {
    modal.style.display = 'flex';
});

closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});