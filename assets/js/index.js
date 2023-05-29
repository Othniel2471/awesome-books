const form = document.querySelector('form');
const bookTitle = document.querySelector('.title');
const bookAuthor = document.querySelector('.author');

// book array

const addBooks = () => {
  const bookDetails = {
    title: bookTitle.value,
    author: bookAuthor.value,
  };

  let books = [];

  if (localStorage.getItem('books')) {
    books = JSON.parse(localStorage.getItem('books'));
  }
  books.push(bookDetails);
  localStorage.setItem('books', JSON.stringify(books));
};

const clearField = () => {
  bookTitle.value = '';
  bookAuthor.value = '';
};

const displayBooks = (book) => {
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
};

const displayItem = () => {
  addBooks();
  const updatedBooks = localStorage.getItem('books');
  const allBooks = JSON.parse(updatedBooks);
  displayBooks(allBooks);
  clearField();
};

(function onReload() {
  if (localStorage.getItem('books')) {
    const allBooks = JSON.parse(localStorage.getItem('books'));
    displayBooks(allBooks);
  }
}());

form.addEventListener('submit', (e) => {
  e.preventDefault();
  displayItem();
});
