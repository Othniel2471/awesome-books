class Books {
  static books = [];

  static form;

  static bookTitle;

  static bookAuthor;

  constructor(title, author) {
    this.title = title;
    this.author = author;
  }

  static initialize() {
    Books.form = document.querySelector('form');
    Books.bookTitle = document.querySelector('.title');
    Books.bookAuthor = document.querySelector('.author');

    const inv = new Books();
    inv.submitForm();

    (function onReload() {
      if (localStorage.getItem('books')) {
        const allBooks = JSON.parse(localStorage.getItem('books'));
        inv.displayBooks(allBooks);
      }
    }());
  }

  addBooks() {
    const title = Books.bookTitle.value;
    const author = Books.bookAuthor.value;
    const bookDetails = new Books(title, author);

    if (localStorage.getItem('books')) {
      this.books = JSON.parse(localStorage.getItem('books'));
    }
    this.books.push(bookDetails);
    localStorage.setItem('books', JSON.stringify(this.books));
  }

  clearField() {
    this.constructor.bookTitle.value = '';
    this.constructor.bookAuthor.value = '';
  }

  // eslint-disable-next-line class-methods-use-this
  displayBooks(book) {
    const books = JSON.parse(localStorage.getItem('books'));
    const bookContainer = document.querySelector('.books-container');
    const displaybook = book.map((item) => `
            <div id="book" data-title="${item.title}">
              <p>${item.title}</p>
              <p>${item.author}</p>
              <button class="remove">Remove</button>
              <hr>
              </div>
              `).join('');

    // display books
    bookContainer.innerHTML = displaybook;

    bookContainer.addEventListener('click', (event) => {
      if (event.target.classList.contains('remove')) {
        // Find the parent book element and remove it
        const bookElement = event.target.closest('#book');
        const bookTitle = bookElement.dataset.title;

        bookElement.remove();
        // Remove the book from the 'books' array
        const bookIndex = books.findIndex((book) => book.title === bookTitle);
        if (bookIndex !== -1) {
          books.splice(bookIndex, 1);
        }
        localStorage.setItem('books', JSON.stringify(books));
      }
    });
  }

  displayItem() {
    this.addBooks();
    const updatedBooks = localStorage.getItem('books');
    const allBooks = JSON.parse(updatedBooks);
    this.displayBooks(allBooks);
    this.clearField();
  }

  submitForm() {
    Books.form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.displayItem();
    });
  }
}

Books.initialize();
