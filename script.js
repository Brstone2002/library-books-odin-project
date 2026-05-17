
let myLibrary = [];
// Save library to localStorage
function saveLibrary() {
    localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
}

// Load library from localStorage
function loadLibrary() {
    const data = localStorage.getItem('myLibrary');
    if (data) {
        myLibrary = JSON.parse(data);
        renderLibrary();
    }
}
const addBtn = document.querySelector('.add-book-btn');
const modal = document.querySelector('.modal');
const getBookTitle = document.querySelector('#title');
const getBookAuthor = document.querySelector('#author');
const getBookPages = document.querySelector('#pages');
const getBookReadStatus = document.querySelector('#read-status');
const submitBtn = document.querySelector('.submit-book');
const bookGrid = document.querySelector('.book-grid');

// Track edit mode
let editIndex = null;

window.onclick = function(event) {
    if (event.target == modal) {
        closeForm();
    }
}

// Book constructor
function Book(title, author, pages, readStatus) {
  this.title = title;
  this.author = author;
  this.pages = Number(pages);
  this.readStatus = readStatus;
}

function addBookToLibrary() {
    // If editing, update the book instead of adding
    if (editIndex !== null) {
        myLibrary[editIndex].title = getBookTitle.value;
        myLibrary[editIndex].author = getBookAuthor.value;
        myLibrary[editIndex].pages = getBookPages.value;
        myLibrary[editIndex].readStatus = getBookReadStatus.checked;
        renderLibrary();
        editIndex = null;
    } else {
        let newBook = new Book(getBookTitle.value, getBookAuthor.value, getBookPages.value, getBookReadStatus.checked);
        myLibrary.push(newBook);
        createBookCard(newBook);
    }
    saveLibrary();
    closeForm();
}

// Render all books in the grid
function renderLibrary() {
    bookGrid.innerHTML = '';
    myLibrary.forEach(book => createBookCard(book));
    saveLibrary();
}
function openForm() {
    getBookAuthor.value = '';
    getBookTitle.value = '';
    getBookPages.value = '';
    getBookReadStatus.checked = false;
    modal.style.display = 'flex';
}

function closeForm() {
    modal.style.display = 'none';
}

function createBookCard(newBook) {
    // Create div
    const bookCard = document.createElement('div');
    bookCard.classList.add('book-card');

    // Style the div
    bookCard.style.border = '1px solid #ccc';
    bookCard.style.borderRadius = '8px';
    bookCard.style.padding = '16px';

    const bookTitle = document.createElement('h2');
    bookTitle.textContent = newBook.title;
    bookCard.appendChild(bookTitle);

    const bookAuthor = document.createElement('p');
    bookAuthor.innerHTML = `<b>Author:</b> ${newBook.author}`;
    bookCard.appendChild(bookAuthor);

    const bookPages = document.createElement('p');
    const formattedPages = Number(newBook.pages).toLocaleString();
    bookPages.innerHTML = `<b>Pages:</b> ${formattedPages}`;
    bookCard.appendChild(bookPages);

    const bookReadStatusContainer = document.createElement('div');
    bookReadStatusContainer.style.display = 'flex';
    bookReadStatusContainer.style.alignItems = 'center';
    bookReadStatusContainer.style.gap = '8px';
    
    const bookReadCheckbox = document.createElement('input');
    bookReadCheckbox.type = 'checkbox';
    bookReadCheckbox.checked = newBook.readStatus;
    bookReadCheckbox.addEventListener('change', () => {
        const index = myLibrary.indexOf(newBook);
        if (index > -1) {
            myLibrary[index].readStatus = bookReadCheckbox.checked;
            saveLibrary();
        }
    });
    
    const bookReadLabel = document.createElement('label');
    bookReadLabel.textContent = 'Read';
    bookReadLabel.style.cursor = 'pointer';
    
    bookReadStatusContainer.appendChild(bookReadCheckbox);
    bookReadStatusContainer.appendChild(bookReadLabel);
    bookCard.appendChild(bookReadStatusContainer);

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.style.padding = '8px 16px';
    deleteBtn.style.border = 'none';
    deleteBtn.style.borderRadius = '4px';
    deleteBtn.style.backgroundColor = '#ff4d4d';
    deleteBtn.style.color = '#fff';
    deleteBtn.style.cursor = 'pointer';
    deleteBtn.addEventListener('click', () => {
        const confirmDelete = confirm('Are you sure you want to delete this book?');
        if (confirmDelete) {
            const index = myLibrary.indexOf(newBook);
            if (index > -1) {
                myLibrary.splice(index, 1);
                bookGrid.removeChild(bookCard);
                saveLibrary();
            }
        }
    });
    bookCard.appendChild(deleteBtn);

    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.style.padding = '8px 16px'; 
    editBtn.style.border = 'none';
    editBtn.style.borderRadius = '4px';
    editBtn.style.backgroundColor = '#4CAF50';
    editBtn.style.color = '#fff';
    editBtn.style.cursor = 'pointer';   
    editBtn.addEventListener('click', () => {
        getBookTitle.value = newBook.title;
        getBookAuthor.value = newBook.author;
        getBookPages.value = newBook.pages;
        getBookReadStatus.checked = newBook.readStatus;
        editIndex = myLibrary.indexOf(newBook);
        modal.style.display = 'flex';
    });
    bookCard.appendChild(editBtn);

    bookGrid.appendChild(bookCard);
}

// Load library on page load (must be at top level, not inside a function)
window.addEventListener('DOMContentLoaded', loadLibrary);