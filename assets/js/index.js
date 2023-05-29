const form = document.querySelector('form');
const bookTitle = document.querySelector('.title');
const bookAuthor = document.querySelector('.author');
const bookContainer = document.querySelector('.books-container');

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
  const displaybook = book.map((item) => `
        <p>${item.title}</p>
        <p>${item.author}</p>
        <button class="remove">Remove</button>
        <hr>
        `).join('');

  // display books
  bookContainer.innerHTML = displaybook;
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