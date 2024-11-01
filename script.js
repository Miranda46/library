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

function bookDataHTML(elem) {
    let index = myLibrary.length - 1;
    const data = document.createElement('div');
    data.appendChild(elem);
    const button1 = document.createElement('button');
    button1.className = 'book_button';
    button1.addEventListener('click', function(){
        
        removeBook(index);
    });
    button1.innerText = 'delete';
    data.appendChild(button1);

    return data
}

function bookToHTML(book) {
    const elem = document.createElement('div')
    elem.className = 'book';
    const text = document.createElement('p');
    text.innerHTML = book.title;
    elem.appendChild(text);
    
    return bookDataHTML(elem);
}

function addBook(event) { 
    const form = document.querySelector('form');
    const formData = new FormData(form);
    const title = formData.get('title');
    const author = formData.get('author');
    const numPages = formData.get('num_pages');
    const read = formData.get('read');

    let book = new Book(title, author, numPages, read);
    console.log(myLibrary)
    addBookToLibrary(book, myLibrary);

    startLibrary();

    form.reset();
}

function appendBookToLibrary(book) {
    let elem = bookToHTML(book);
    let library = document.querySelector('.library');
    library.appendChild(elem);
}

function startLibrary() {
    document.querySelector('.library').innerHTML = '';
    for (book in myLibrary){
        appendBookToLibrary(myLibrary[book]);
    }
}

function removeBook(index) {
    myLibrary.splice(index, 1);
    startLibrary();
    console.log('deon')
}

let add_button = document.getElementById('add_button');
add_button.addEventListener('click', addBook);

let formularButton = document.getElementById('formular_button');
formularButton.addEventListener('click', showFormular);

function showFormular(event) {
    let formular = document.getElementById('form');
    formular.style.visibility = 'visible';
}

