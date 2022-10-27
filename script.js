const booksGrid = document.querySelector(".books-grid")
const addBookBtn = document.querySelector(".add-book-button")

let myLibrary = []

function Book(title, author, pageCount, readStatus) {
  this.title = title
  this.author = author
  this.pageCount = pageCount
  this.readStatus = Boolean(readStatus)
}

function addBookToLibrary(book) {
  myLibrary.push(book)
}