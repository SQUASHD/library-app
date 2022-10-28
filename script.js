const booksGrid = document.querySelector(".books-grid")
const addBookBtn = document.querySelector(".add-book-button")

const modal = document.getElementById("myModal");
const form = document.getElementById("add-book-form")
const submitBtn = document.querySelector(".submit-btn")
const title = document.getElementById("title")
const author = document.getElementById("author")
const pageCount = document.getElementById("page-count")
const readStatus = document.getElementById("read-status")

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
  modal.style.display = "flex";
}

window.onclick = (e) => {
  if (e.target == modal) {
    modal.style.display = "none";
  }
}

submitBtn.addEventListener("click", (e) => {
  e.preventDefault()
  const book = new Book(title.value, author.value, pageCount.value, readStatus.value)
  addBookToLibrary(book)
  modal.style.display = "none";
  form.reset()
  console.log(book)

  createBookCard(book)
})

function createBookCard(book) {
  const bookCard = document.createElement("div")
  bookCard.classList.add("book-card")
  const title = document.createElement("h2")
  title.textContent = book.title
  const author = document.createElement("p")
  author.textContent = book.author
  const pageCount = document.createElement("p")
  pageCount.textContent = book.pageCount
  const readStatus = document.createElement("p")
  readStatus.textContent = book.readStatus

  const buttonGroup = document.createElement("div")
  buttonGroup.classList.add("button-group")
  const readStatusBtn = document.createElement("div")
  readStatusBtn.classList.add("book-btn")
  buttonGroup.appendChild(readStatusBtn)
  const removeBtn = document.createElement("div")
  removeBtn.classList.add("book-btn", "remove-btn")
  buttonGroup.appendChild(removeBtn)

  if(readStatus.value) {
    readStatusBtn.textContent = "Read"
    readStatusBtn.classList.add("read")
  }
  else {
    readStatusBtn.textContent = "Not Read"
    readStatusBtn.classList.add("not-read")
  }

  removeBtn.textContent = "Remove"

  removeBtn.addEventListener("click", () => {
    bookCard.remove()
  })

  readStatusBtn.addEventListener("click", () => {
    if(readStatusBtn.classList.contains("read")) {
      readStatusBtn.textContent = "Not Read"
      readStatusBtn.classList.remove("read")
      readStatusBtn.classList.add("not-read")
      book.readStatus = !book.readStatus
    }
  })

  
  bookCard.append(title, author, pageCount, buttonGroup)
  booksGrid.append(bookCard)
}