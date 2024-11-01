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
    let elem = document.createElement('div')
    elem.className = 'book';
    let text = document.createElement('p');
    text.innerHTML = book.title;
    elem.appendChild(text);
    return elem
}

function addBook(title, author, pageNum, read) { 
    let book = new Book(title, author, pageNum, read);
    addBookToLibrary(book, myLibrary);
    let shelf = document.getElementsByClassName('shelf');
    document.body.insertBefore(bookToHTML(book), shelf[0]);

}

