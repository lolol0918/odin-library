const form = document.getElementById("bookForm");
const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");
const pagesInput = document.getElementById("pages");
const readInput = document.getElementById("read");
const modal = document.getElementById("bookModal");
const openBtn = document.getElementById("openModalBtn");
const closeBtn = document.querySelector(".closeBtn");
const booksContainer = document.querySelector(".books-grid");


let myLibrary = [];

myLibrary[0] = new Book("The Hobbit", "JRR Tolkien", 400, true);
myLibrary[1] = new Book("Hungry Caterpillar", "Big Caterpillar", 15, false);

renderLibrary();

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

    //renders the books when you add them
    renderLibrary();
}

//deletes the object and renders the page again
function deleteBook(id) {
    myLibrary = myLibrary.filter(book => book.id !== id);
    renderLibrary();
};

// Render library
function renderLibrary() {
  booksContainer.innerHTML = "";

  myLibrary.forEach((book) => {
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

// ✅ Event delegation (one listener for everything)
booksContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-btn")) {
    const bookId = e.target.dataset.id;
    deleteBook(bookId);
  }

  if (e.target.classList.contains("book-status")) {
    const bookId = e.target.dataset.id;
    const book = myLibrary.find((b) => b.id === bookId);
    if (book) {
      book.read = !book.read;
      renderLibrary();
    }
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

