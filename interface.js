const myLibrary = [];
const modal = document.querySelector('.modal');
const add_button = document.querySelector('.floating-add');
const submit = document.querySelector('.submit');
const close = document.querySelector('.close');

const main_content = document.querySelector('.main-content')
const books_container = document.querySelector('.books-container');


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
let book = document.querySelector('.book');

let book_name = document.getElementById('book-name');
let book_author = document.getElementById('book-author');
let book_intro = document.getElementById('book-intro')
let book_date = document.getElementById('book-date');
let status_button = document.querySelector('#read-status');
let book_image = book.querySelector('.book-image > img')

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
        const date = book_date.value;
        const datePattern = /^\d{1,2}\.\d{1,2}\.\d{2}$/;
        const file = fileInput.files[0];
    
        if (!file) {
            alert("Please upload an image.");
            return;
        }

        if (!datePattern.test(date)) {
            alert("Please enter the date in the format dd.m.yy (e.g., 29.3.25)");
            return;
        }
        const reader = new FileReader();
        reader.onload = function (e) {
            const imageDataURL = e.target.result;
    
            addBookToLibrary(book_date.value, imageDataURL, book_name.value, book_author.value, book_intro.value, status_button.value);
    
            const hr = document.createElement('hr');
            books_container.appendChild(hr);
    
            const book_div = document.createElement('div');
            book_div.classList.add('book');
            books_container.appendChild(book_div);
    
            const new_book_date = document.createElement('div');
            new_book_date.innerHTML = book_date.value;
            new_book_date.classList.add('date');
            book_div.appendChild(new_book_date);
    
            const new_book_image = document.createElement('div');
            new_book_image.classList.add('book-image');
            const new_image = document.createElement('img');
            new_image.src = imageDataURL; 
            new_image.width = 120;
            new_image.height = 200;
            book_div.appendChild(new_book_image);
            new_book_image.appendChild(new_image);
    
            const new_book_info = document.createElement('div');
            new_book_info.classList.add('info');
            book_div.appendChild(new_book_info);
    
            const new_book_title = document.createElement('div');
            new_book_title.innerHTML = book_name.value;
            new_book_title.classList.add('title');
            new_book_info.appendChild(new_book_title);
    
            const new_book_author = document.createElement('div');
            new_book_author.innerHTML = book_author.value;
            new_book_author.classList.add('book-author');
            new_book_info.appendChild(new_book_author);
    
            const new_book_intro = document.createElement('div');
            new_book_intro.innerHTML = book_intro.value;
            new_book_intro.classList.add('intro');
            new_book_info.appendChild(new_book_intro);
    
            const new_book_buttons = document.createElement('div');
            new_book_buttons.classList.add('buttons');
            new_book_info.appendChild(new_book_buttons);
    
            const new_book_status_buttons = document.createElement('div');
            new_book_status_buttons.classList.add('status-buttons');
            new_book_buttons.appendChild(new_book_status_buttons);
    
            if(status_button.value == 'read'){
                const new_read_button = document.createElement('button');
                new_read_button.classList.add('read');
                new_read_button.innerHTML = "Read";
                new_book_status_buttons.appendChild(new_read_button);
            } else {
                const new_not_read_button = document.createElement('button');
                new_not_read_button.classList.add('not-read');
                new_not_read_button.innerHTML = "Not Read";
                new_book_status_buttons.appendChild(new_not_read_button);
            }
    
            const customize_buttons = document.querySelector('.customize-buttons')
            const new_customizable_buttons = document.createElement('div');
            new_customizable_buttons.classList.add('customize-buttons');
            new_customizable_buttons.innerHTML = customize_buttons.innerHTML;
            new_book_buttons.appendChild(new_customizable_buttons)
    
            modal.close();
    
            book_date.value = '';
            uploadIcon.innerHTML = '📁';
            uploadText.innerHTML = 'Click to upload';
            fileInput.value = '';
            book_name.value = '';
            book_author.value = '';
            book_intro.value = '';
        };
    
        reader.readAsDataURL(file);
    });
}

displayBooks()