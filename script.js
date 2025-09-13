import { Book, Library} from './classes.js';

const form = document.getElementById("bookForm");
const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");
const pagesInput = document.getElementById("pages");
const readInput = document.getElementById("read");
const modal = document.getElementById("bookModal");
const openBtn = document.getElementById("openModalBtn");
const closeBtn = document.querySelector(".closeBtn");
const booksContainer = document.querySelector(".books-grid");

const myLibrary = new Library();
myLibrary.addBook(new Book("The Hobbit", "JRR Tolkien", 400, true));

renderLibrary();


function addBookToLibrary(book) {
    // take params, create a book then store it in the array
    myLibrary.addBook(book);

    //renders the books when you add them
    renderLibrary();
}

//deletes the object and renders the page again
function deleteBook(id) {
    myLibrary.deleteBook(id);
    renderLibrary();
};

// Render library
function renderLibrary() {
  booksContainer.innerHTML = "";

  myLibrary.getBooks().forEach((book) => {
    const card = document.createElement("div");
    card.classList.add("book-card");
    card.innerHTML = `
      <h3 class="book-title">${book.name}</h3>
      <div class="book-info">
        <div class="book-author">${book.author}</div>
        <div class="book-pages">${book.pages} pages</div>
      </div>
      <div class="book-status ${book.read ? "read" : "unread"}" data-id="${book.id}">
        ${book.read ? "Read" : "Not Read"}
      </div>
      <button class="delete-btn" data-id="${book.id}">
        🗑️ Delete Book
      </button>
    `;
    booksContainer.appendChild(card);
  });
}


booksContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-btn")) {
    const bookId = e.target.dataset.id;
    deleteBook(bookId);
  }

  if (e.target.classList.contains("book-status")) {
    const bookId = e.target.dataset.id;
    const book = myLibrary.getBooks().find((b) => b.id === bookId);
    book.toggleRead();
    renderLibrary();
  }
});

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const newBook = new Book(
        titleInput.value,
        authorInput.value,
        pagesInput.value,
        readInput.checked
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

