const myLibrary = [];
const addBtn = document.querySelector('.add-book-btn');
const modal = document.querySelector('.modal');

window.onclick = function(event) {
    if (event.target == modal) {
        closeForm();
    }
}

// Book constructor
function Book(title, author, pages, readStatus) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.readStatus = readStatus;
}

function addBookToLibrary() {
  // take params, create a book then store it in the array
}

function openForm() {
    modal.style.display = 'flex';
}

function closeForm() {
    modal.style.display = 'none';
}
