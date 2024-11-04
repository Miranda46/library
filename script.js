function Book(title, author, pageNum, read) {
    this.title = title;
    this.author = author;
    this.pageNum = pageNum
    this.read = read;

    this.info = function(){
       .log(read)
        return `${this.title} by ${this.author}, ${this.pageNum} page, ${this.read ? 'read':'not read yet'}.`;
    }

    this.setRead = function(read){
        this.read = read;
    }
}

const myLibrary = [];

function addBookToLibrary(book, library){
    if (book instanceof Book) library.push(book);
}

function bookDataHTML(elem, index, book) {
    const data = document.createElement('div');
    const button1 = document.createElement('button');
    const x = new Image();
    data.style.display = 'flex';
    data.style.flexFlow = 'column nowrap';
    data.appendChild(elem);
    button1.className = 'book_button';
    button1.setAttribute('book_index', index);
    button1.addEventListener('click', removeBook);
    x.src = "./assets/close-box.svg";
    x.alt = 'close';
    x.style.width = '20px';
    x.style.height = '20px';
    x.title = 'Click to remove this book from library. '
    button1.appendChild(x);
    data.appendChild(button1);
    if (!book.read) {
        const button2 = document.createElement('button');
        button2.className = 'book_button';
        button2.setAttribute('book_index', index);
        button2.addEventListener('click', function() {
            myLibrary[index].setRead(true);
            startLibrary();
        });
        const eye = new Image();
        eye.src = "./assets/book-check.svg";
        eye.alt = 'close';
        eye.style.width = '20px';
        eye.style.height = '20px';
        eye.title = 'Click if you read this book.'
        button1.appendChild(eye);
        button2.appendChild(eye);
        data.appendChild(button2);
    }
    return data
}

function bookToHTML(book, index) {
    const elem = document.createElement('div')
    elem.className = 'book';
    const text = document.createElement('p');
    text.innerHTML = book.title;
    elem.appendChild(text);
    elem.addEventListener('click', function() {
        alert(myLibrary[index].info())
    });
    elem.title = book.info();
    return bookDataHTML(elem, index, book);
}

function addBook(event) { 
    let dialog = document.getElementById('dialog');
    dialog.close();
    const form = document.querySelector('form');
    const formData = new FormData(form);
    const title = formData.get('title');
    const author = formData.get('author');
    const numPages = formData.get('num_pages');
    const read = formData.get('read');
    if (!verifyBook(title, author, numPages)){
        alert('El libro debe tener un título, un autor y un número de páginas mayor a 0');
        return;
    }
    let book = new Book(title, author, numPages, read);
    addBookToLibrary(book, myLibrary);
    startLibrary();
    form.reset();
}

function verifyBook(title, author, numPages){
    if (title === null || title === undefined || typeof title !== 'string'){
        return false;
    }
    if (author === null || author === undefined || typeof author !== 'string'){
        return false;
    }
    if (numPages === Infinity || numPages < 1 ) { 
        return false;
    }

    return true;
}

function appendBookToLibrary(book, index) {
    let elem = bookToHTML(book, index);
    let library = document.querySelector('.library');
    library.appendChild(elem);
}

function startLibrary() {
    document.querySelector('.library').innerHTML = '';
    for (book in myLibrary){
        appendBookToLibrary(myLibrary[book], book);
    }
}

function removeBook(event) {
    let index = event.target.getAttribute('book_index');
    myLibrary.splice(index, 1);
    startLibrary();
}

let add_button = document.getElementById('add_button');
add_button.addEventListener('click', addBook);

let formularButton = document.getElementById('formular_button');
formularButton.addEventListener('click', showFormular);

function showFormular(event) {
    let dialog = document.getElementById('dialog');
    dialog.showModal();
}

