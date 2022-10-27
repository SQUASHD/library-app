const booksGrid = document.querySelector(".books-grid")
const addBookBtn = document.querySelector(".add-book-button")
const modal = document.getElementById("myModal");
const span = document.getElementsByClassName("close")[0];


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

addBookBtn.onclick = function() {
  modal.style.display = "block";
}

window.onclick = (e) => {
  if (e.target == modal) {
    modal.style.display = "none";
  }
}