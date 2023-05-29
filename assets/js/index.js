const form = document.querySelector('form');
const bookTitle = document.querySelector('.title');
const bookAuthor = document.querySelector('.author');
const addBook = document.querySelector('.add');

// book array
const books = [];

const addBooks = () => {
  const bookDetails = {
    title: bookTitle.value,
    author: bookAuthor.value,
  };
  books.push(bookDetails);
};

const clearField = () => {
  bookTitle.value = '';
  bookAuthor.value = '';
};

const displayBooks = (book) => {
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
    }
  });
};

const displayItem = () => {
  addBooks();
  displayBooks(books);
  clearField();
};

form.addEventListener('submit', (e) => {
  e.preventDefault();
  displayItem();
});

// Add book to local Storage

addBook.addEventListener('click', () => {
  const book = {
    title: bookTitle.value,
    author: bookAuthor.value,
  };
  const bookIndex = books.length + 1;

  localStorage.setItem(`book-${bookIndex}`,
    JSON.stringify(book));
});
