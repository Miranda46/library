function Book(title, author, pageNum, read) {
    this.title = title;
    this.author = author;
    this.pageNum = pageNum
    this.read = read;

    function info(){
        return `${title} by ${author}, ${pageNum} page,
        ${read ? 'read':'not read yet'}.`;
    }
}

const myLibrary = [];

function addBookToLibrary(book, library){
    if (book instanceof Book) library.push(book);
}

function bookToHTML(book) {
    const elem = document.createElement('div')
    elem.className = 'book';
    const text = document.createElement('p');
    text.innerHTML = book.title;
    elem.appendChild(text);
    return elem
}

function addBook(event) { 
    const form = document.querySelector('form');
    var formData = new FormData(form);
    const title = formData.get('title');
    const author = formData.get('author');
    const numPages = formData.get('num_pages');
    const read = formData.get('read');
    let book = new Book(title, author, numPages, read);
    addBookToLibrary(book, myLibrary);
    let shelf = document.querySelector('.library');
    let elem = bookToHTML(book);
    shelf.appendChild(elem);
    form.reset()
}


let add_button = document.getElementById('add_button');
add_button.addEventListener('click', addBook);

let formularButton = document.getElementById('formular_button');
formularButton.addEventListener('click', showFormular);

function showFormular(event) {
    let formular = document.getElementById('form');
    formular.style.visibility = 'visible';
}

