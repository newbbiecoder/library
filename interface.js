const myLibrary = [];
const modal = document.querySelector('.modal');
const add_button = document.querySelector('.floating-add');
const submit = document.querySelector('.submit');
const close = document.querySelector('.close');

const main_content = document.querySelector('.main-content')
const books_container = document.querySelector('.books-container');

const edit_modal = document.querySelector('.edit-modal');

let books = document.querySelectorAll('.book');
let book = document.querySelector('.book');

// DIALOG 
let dialog_book_name = document.getElementById('book-name');
let dialog_book_author = document.getElementById('book-author');
let dialog_book_intro = document.getElementById('book-intro')
let dialog_book_date = document.getElementById('book-date');
let dialog_status_button = document.querySelector('#read-status');
let dialog_book_image = book.querySelector('#fileInput');

// DOM PAGE
let date = book.querySelector('.date');
let book_image = book.querySelector('.book-image > img[src]');
let title = book.querySelector('.title');
let book_author = book.querySelector('.book-author');
let intro = book.querySelector('.intro');
let status_buttons = book.querySelector('.status-buttons > button');

let formModal = document.querySelector('.modal form');

let errorName = document.querySelector('.errorName');
let errorAuthor = document.querySelector('.errorAuthor');
let errorIntro = document.querySelector('.errorIntro');
let errorDate = document.querySelector('.errorDate');

// FORM VALIDATION

dialog_book_name.addEventListener("input", (event) => {
    if(dialog_book_name.validity.valid){
        errorName.textContent = "";
        errorName.classList = "error";
    }
})

dialog_book_author.addEventListener("input", (event) => {
    if(dialog_book_author.validity.valid){
        errorAuthor.textContent = "";
        errorAuthor.classList = "error";
    }
})

dialog_book_intro.addEventListener("input", (event) => {
    if(dialog_book_intro.validity.valid){
        errorIntro.textContent = "";
        errorIntro.classList = "error";
    }
})

const datePattern = /^\d{1,2}\.\d{1,2}\.\d{2}$/;

dialog_book_date.addEventListener("input", (event) => {
    if(dialog_book_date.validity.valid){
        errorDate.textContent = "";
        errorDate.classList = "error";
    }  
})

formModal.addEventListener('submit', (event) => {
    if(!dialog_book_name.validity.valid){
        showError();

        event.preventDefault();
    }
    if(!dialog_book_author.validity.valid){
        showError();

        event.preventDefault();
    }
    if(!dialog_book_intro.validity.valid){
        showError();

        event.preventDefault();
    }
    if(!dialog_book_date.validity.valid){
        showError();

        event.preventDefault();
    }
})

function showError(){
    if(dialog_book_name.validity.valueMissing){
        errorName.textContent = "Book name is required, darling!";
    }
    if(dialog_book_author.validity.valueMissing){
        errorAuthor.textContent = "Book author is required, darling!";
    }
    if(dialog_book_intro.validity.valueMissing){
        errorIntro.textContent = "Intro is required, darling!";
    }
    if(dialog_book_date.validity.valueMissing){
        errorDate.textContent = "Enter date in required format: dd.m.yy (e.g., 29.3.25)";
    }
}


class Book{
    constructor(date, image, name, author, content, status){
        this.date = date;
        this.image = image;
        this.name = name;
        this.author = author;
        this.content = content;
        this.status = status;
        this.id = crypto.randomUUID();
    }
    addBookToLibrary(date, image, name, author, content, status){
        const new_book = new Book(date, image, name, author, content, status);
        myLibrary.push(new_book);
    }
    displayBooks(){
        add_button.addEventListener('click', () => {
            if(modal.style.display == 'none'){
                modal.style.display = 'block';
            }
            modal.showModal();
        })

        submit.addEventListener('click', () => {
            const date = dialog_book_date.value;
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
            reader.onload = (e) => {
                console.log("HELLO WTF")
                const imageDataURL = e.target.result;
        
                this.addBookToLibrary(dialog_book_date.value, imageDataURL, dialog_book_name.value, dialog_book_author.value, dialog_book_intro.value, dialog_status_button.value);

                const hr = document.createElement('hr');
                books_container.appendChild(hr);
        
                const book_div = document.createElement('div');
                book_div.classList.add('book');
                books_container.appendChild(book_div);
        
                const new_book_date = document.createElement('div');
                new_book_date.innerHTML = dialog_book_date.value;
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
                new_book_title.innerHTML = dialog_book_name.value;
                new_book_title.classList.add('title');
                new_book_info.appendChild(new_book_title);
        
                const new_book_author = document.createElement('div');
                new_book_author.innerHTML = dialog_book_author.value;
                new_book_author.classList.add('book-author');
                new_book_info.appendChild(new_book_author);
        
                const new_book_intro = document.createElement('div');
                new_book_intro.innerHTML = dialog_book_intro.value;
                new_book_intro.classList.add('intro');
                new_book_info.appendChild(new_book_intro);
        
                const new_book_buttons = document.createElement('div');
                new_book_buttons.classList.add('buttons');
                new_book_info.appendChild(new_book_buttons);
        
                const new_book_status_buttons = document.createElement('div');
                new_book_status_buttons.classList.add('status-buttons');
                new_book_buttons.appendChild(new_book_status_buttons);
        
                if(dialog_status_button.value == 'read'){
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
        
                dialog_book_date.value = '';
                uploadIcon.innerHTML = '📁';
                uploadText.innerHTML = 'Click to upload';
                fileInput.value = '';
                dialog_book_name.value = '';
                dialog_book_author.value = '';
                dialog_book_intro.value = '';
            };
        
            reader.readAsDataURL(file);
        });
    }
}

let newBook = new Book();
newBook.displayBooks();

books.forEach((book) => {
    let date = book.querySelector('.date');
    let book_image = book.querySelector('.book-image > img');
    let title = book.querySelector('.title');
    let book_author = book.querySelector('.book-author');
    let intro = book.querySelector('.intro');
    let status_buttons = book.querySelector('.status-buttons > button');

    newBook.addBookToLibrary(date.innerHTML, book_image.innerHTML, title.innerHTML, book_author.innerHTML, intro.innerHTML, status_buttons.innerHTML);
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

// Edit & Delete Modal
books_container.addEventListener('click', (e) => { 

    const svg = e.target.closest('svg');

    if(!svg) return;

    const book = svg.closest('.book');
    const allBooks = document.querySelectorAll('.book');

    // Delete button
    if (svg.matches('.customize-buttons svg:nth-child(2)')) {
        const hr = book.nextElementSibling;

        if (allBooks.length === 1) {
            alert("ATLEAST READ ONE BOOK WTF");
        } else {
            if (hr && hr.tagName === 'HR') hr.remove();
            book.remove();
        }
    }
    // Edit button
    else if(svg.matches('.customize-buttons svg:first-child')){
        const edit = e.target;

        let edit_dialog_book_name = document.querySelector('.edit-modal form .second label #book-name');
        let edit_dialog_book_author = document.querySelector('.edit-modal form .second label #book-author');
        let edit_dialog_book_intro = document.querySelector('.edit-modal form .second label #book-intro')
        let edit_dialog_book_date = document.querySelector('.edit-modal form .second label #book-date');
        let edit_dialog_book_image = document.querySelector('.edit-modal form .first #fileInput');
        let edit_dialog_read_button = document.querySelector('.edit-modal form .second .status-buttons select option:first-child');
        let edit_dialog_not_read_button = document.querySelector('.edit-modal form .second .status-buttons select option:nth-child(2)');

        const edit_modal_close = document.querySelector('.edit-modal .header svg')

        edit_modal_close.addEventListener('click', () => {
            edit_modal.close();
        })
        
        const uploadText = document.querySelector('.edit-modal form .first .upload-content #uploadText');
        let updatedImage = null;
        uploadText.textContent = "Click to upload";

        const book = edit.closest('.book');
        const date = book.querySelector('.date');
        const book_image = book.querySelector('.book-image img');
        const title = book.querySelector('.title');
        const book_author = book.querySelector('.book-author');
        const intro = book.querySelector('.intro');
        const status_button = book.querySelector('.status-buttons');
        const read_button = status_button.querySelector('.status-buttons > .read');
        const not_read_button = status_button.querySelector('.status-buttons > .not-read');

        edit_modal.showModal();

        edit_dialog_book_name.value = title.innerHTML ;
        edit_dialog_book_author.value = book_author.innerHTML;
        edit_dialog_book_intro.value = intro.innerHTML;
        edit_dialog_book_date.value = date.innerHTML;

        if (read_button) {
            edit_dialog_read_button.selected = true;
        } else if (not_read_button) {
            edit_dialog_not_read_button.selected = true;
        }
        document.querySelector('.edit-modal form .first').addEventListener('click', () => {
            document.querySelector('.edit-modal form .first #fileInput').click();
        });

        
        updatedImage = null;
        edit_dialog_book_image.addEventListener('change', function() {
            const file = this.files[0];
            if(file){
                const reader = new FileReader();
                reader.onload = function(e) {
                    updatedImage = e.target.result;
                    uploadText.textContent = "✅ Image updated!";
                };
                reader.readAsDataURL(file);
            }
        })

        const submit_edit_book = document.querySelector('.edit-modal .second button');
        submit_edit_book.onclick = () => {

            const datePattern = /^\d{1,2}\.\d{1,2}\.\d{2}$/;

            if (!datePattern.test(edit_dialog_book_date.value)) {
                alert("Please enter the date in the format dd.m.yy (e.g., 29.3.25)");
                return;
            }
            title.innerHTML = edit_dialog_book_name.value;
            book_author.innerHTML = edit_dialog_book_author.value;
            intro.innerHTML = edit_dialog_book_intro.value;
            date.innerHTML = edit_dialog_book_date.value;
            book_image.innerHTML = edit_dialog_book_image.value;
            
            if(updatedImage){
                book_image.src = updatedImage;
            }
            if(edit_dialog_read_button.selected){
                if(!status_button.contains(read_button)){
                    const new_read = document.createElement('button');
                    new_read.classList.add('read');
                    new_read.innerHTML = 'Read';
                    status_button.innerHTML = '';
                    status_button.appendChild(new_read);
                }             
            }
            else{
                if(!status_button.contains(not_read_button)){
                    const not_new_read = document.createElement('button');
                    not_new_read.classList.add('not-read');
                    not_new_read.innerHTML = 'Not Read';
                    status_button.innerHTML = '';
                    status_button.appendChild(not_new_read);
                }
            }
        }
    }
});