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

  // eslint-disable-next-line class-methods-use-this
  addBooks() {
    const title = Books.bookTitle.value;
    const author = Books.bookAuthor.value;
    const bookDetails = new Books(title, author);

    if (localStorage.getItem('books')) {
      Books.books = JSON.parse(localStorage.getItem('books'));
    }
    Books.books.push(bookDetails);
    localStorage.setItem('books', JSON.stringify(Books.books));
  }

  // eslint-disable-next-line class-methods-use-this
  clearField() {
    Books.bookTitle.value = '';
    Books.bookAuthor.value = '';
  }

  // eslint-disable-next-line class-methods-use-this
  displayBooks(book) {
    const books = JSON.parse(localStorage.getItem('books'));
    const bookContainer = document.querySelector('.books-container');
    const displaybook = book.map((item) => `
            <div id="book" class="books" data-title="${item.title}">
              <p>"${item.title}" by ${item.author}</p>
              <button class="remove">Remove</button>
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

function updateTime() {
  const currentDate = new Date();
  const options = {
    month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric',
  };
  let formattedDate = currentDate.toLocaleString('en-US', options);
  formattedDate = formattedDate.replace('At', ',');

  document.getElementById('date').innerHTML = formattedDate;
  setTimeout(updateTime, 60000);
}

updateTime();

const pages = document.querySelectorAll('.nav-links');
const bookSection = document.querySelector('.book-section');
const formSection = document.querySelector('.form-section');
const contactSection = document.querySelector('.contact-section');

pages.forEach((page) => {
  page.addEventListener('click', (e) => {
    if (e.target.classList.contains('list')) {
      bookSection.classList.remove('non-active');
      bookSection.classList.add('active');
      formSection.classList.add('non-active');
      contactSection.classList.add('non-active');
    } else if (e.target.classList.contains('new')) {
      bookSection.classList.remove('active');
      bookSection.classList.add('non-active');
      formSection.classList.remove('non-active');
      formSection.classList.add('active');
      contactSection.classList.remove('active');
      contactSection.classList.add('non-active');
    } else if (e.target.classList.contains('contact')) {
      bookSection.classList.remove('active');
      bookSection.classList.add('non-active');
      formSection.classList.remove('active');
      formSection.classList.add('non-active');
      contactSection.classList.remove('non-active');
      contactSection.classList.add('active');
    }
  });
});
