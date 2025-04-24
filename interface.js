const myLibrary = [];
const modal = document.querySelector('.modal');
const add_button = document.querySelector('.floating-add');
const submit = document.querySelector('.submit');
const close = document.querySelector('.close');


function Book(date, image, name, author, content, status){
    this.date = date;
    this.image = image;
    this.name = name;
    this.author = author;
    this.content = content;
    this.status = status;
    this.id = crypto.randomUUID();;
}

function addBookToLibrary(date, image, name, author, content, status){
    const atomic_habits = new Book(date, image, name, author, content, status);
    myLibrary.push(atomic_habits);
}


let books = document.querySelectorAll('.book');

let book_name = document.getElementById('book-name');
let book_author = document.getElementById('book-author');
let book_intro = document.getElementById('book-intro')
let book_date = document.getElementById('book-date');
let status_button = document.querySelector('#read-status');

books.forEach((book) => {
    let date = book.querySelector('.date');
    let book_image = book.querySelector('.book-image > img');
    let title = book.querySelector('.title');
    let book_author = book.querySelector('.book-author');
    let intro = book.querySelector('.intro');
    let status_buttons = book.querySelector('.status-buttons > button');

    addBookToLibrary(date.innerHTML, book_image.innerHTML, title.innerHTML, book_author.innerHTML, intro.innerHTML, status_buttons.innerHTML);
})

console.log(myLibrary);

close.addEventListener('click', () => {
    modal.close();
})

const uploadText = document.querySelector('#uploadText');
const uploadIcon = document.querySelector('.upload-icon');
const fileInput = document.getElementById('fileInput');

document.querySelector('.first').addEventListener('click', () => {
    document.querySelector('#fileInput').click();
});

fileInput.addEventListener('change', function () {
    const file = this.files[0];
    if (file) {
      uploadText.textContent = "✅ Image uploaded!";
    }
});

function displayBooks(){

    add_button.addEventListener('click', () => {
        if(modal.style.display == 'none'){
            modal.style.display = 'block';
        }
        modal.showModal();
    })

    submit.addEventListener('click', () => {       
        addBookToLibrary(book_date.value, fileInput.value, book_name.value, book_author.value, book_intro.value, status_button.value);
        modal.close();

        book_date.value = '';
        uploadIcon.innerHTML = '📁';
        uploadText.innerHTML = 'Click to upload';
        book_name.value = '';
        book_author.value = '';
        book_intro.value = '';
    })
}

displayBooks()