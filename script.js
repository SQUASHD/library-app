let booksGenerated = false;
let darkThemeToggled = false;

const booksGrid = document.querySelector(".books-grid")
const addBookBtn = document.querySelector(".add-book-button")
const generateBooksBtn = document.querySelector(".generate-books-button")
const clearBooksBtn = document.querySelector(".clear-books-button")
const clearGeneratedBooksBtn = document.querySelector(".clear-generated-books-button")
const logInBtn = document.querySelector(".log-in-button")
const themeToggleBtn = document.querySelector(".theme-toggle-button");
const main = document.querySelector(".main")
const header = document.querySelector(".header")
const headerTitle = document.querySelector(".header-title")
let bookCards = document.querySelectorAll(".book-card");
let libraryFunctionBtns = document.querySelectorAll("[class*=button]");

const modal = document.getElementById("myModal");
const form = document.getElementById("add-book-form")
const submitBtn = document.querySelector(".submit-btn")
const title = document.getElementById("title")
const author = document.getElementById("author")
const pageCount = document.getElementById("page-count")
const readStatus = document.getElementById("read-status")

let myLibrary = []

function Book(title, author, pageCount, readStatus, generated = false) {
  this.title = title
  this.author = author
  this.pageCount = pageCount
  this.readStatus = Boolean(readStatus)
  this.generated = generated
}

function addBookToLibrary(book) {
  myLibrary.push(book)
}

addBookBtn.onclick = function() {
  modal.style.display = "flex";
  title.focus();
}

window.onclick = (e) => {
  if (e.target == modal) {
    modal.style.display = "none";
  }
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    modal.style.display = "none";
  } 
})

form.addEventListener("submit", (e) => {
  e.preventDefault()

  const book = new Book(title.value, author.value, pageCount.value, readStatus.checked)
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
  title.textContent = `"${book.title}"`
  const author = document.createElement("p")
  author.textContent = book.author
  const pageCount = document.createElement("p")
  pageCount.textContent = `${book.pageCount} pages`
  const readStatus = document.createElement("p")
  readStatus.textContent = book.readStatus

  const buttonGroup = document.createElement("div")
  buttonGroup.classList.add("button-group")
  const readStatusBtn = document.createElement("div")
  readStatusBtn.classList.add("book-btn")
  buttonGroup.appendChild(readStatusBtn)
  const removeBtn = document.createElement("div")
  removeBtn.classList.add("book-btn", "remove-button", "button")
  buttonGroup.appendChild(removeBtn)

  if(book.readStatus) {
    readStatusBtn.textContent = "Read"
    readStatusBtn.classList.add("read")
  }
  else {
    readStatusBtn.textContent = "Not Read"
    readStatusBtn.classList.add("not-read")
  }

  if (book.generated) {
    bookCard.classList.add("generated")
  }

  if (darkThemeToggled) {
    bookCard.classList.add("dark")
    readStatusBtn.classList.add("dark")
    removeBtn.classList.add("dark")
  }

  removeBtn.textContent = "Remove"

  readStatusBtn.addEventListener("click", () => {
    toggleReadStatus(readStatusBtn, book);
  })

  removeBtn.addEventListener("click", () => {
    bookCard.remove()
  })

  bookCard.append(title, author, pageCount, buttonGroup)
  booksGrid.append(bookCard)
}

function toggleReadStatus(readStatusBtn, book) {
  if (readStatusBtn.classList.contains("read")) {
    readStatusBtn.textContent = "Not Read";
    readStatusBtn.classList.remove("read");
    readStatusBtn.classList.add("not-read");
    book.readStatus = !book.readStatus;
  }
  else {
    readStatusBtn.textContent = "Read";
    readStatusBtn.classList.remove("not-read");
    readStatusBtn.classList.add("read");
    book.readStatus = !book.readStatus;
  }
}

generateBooksBtn.addEventListener("click", () => {
  if (booksGenerated) {
    alert("Books already generated")
    return
  }
  if (!booksGenerated) {
    for (let i = 0; i < 10; i++) {
      const book = new Book(`Book ${i + 1}`, `Author ${i + 1}`, Math.floor(Math.random() * 1000), Math.round(Math.random()), true)
      createBookCard(book)
    }
    booksGenerated = true;
  }
  clearGeneratedBooksBtn.style.display = "block"
})

clearBooksBtn.addEventListener("click", () => {
  if (booksGrid.children.length === 0) {
    alert("No books to clear")
    return
  }
  const confirm = window.confirm("Are you sure you want to clear all books?")
  if (confirm) {
  booksGrid.innerHTML = ""
  booksGenerated = false;
  clearGeneratedBooksBtn.style.display = "none"
  }
})

clearGeneratedBooksBtn.addEventListener("click", () => {
  const confirm = window.confirm("Are you sure you want to clear all generated books?")
  if (confirm) {
    const generatedBooks = document.querySelectorAll(".generated")
    generatedBooks.forEach(book => book.remove())
    booksGenerated = false;
    clearGeneratedBooksBtn.style.display = "none"
  }
})

logInBtn.addEventListener("click", () => {
  alert("Log in not currently working")
})

themeToggleBtn.addEventListener("click", () => toggleDarkTheme())

function toggleDarkTheme() {
  if (darkThemeToggled) {
    setLightMode();
  }
  else {
    setDarkMode();
  }
}

window.onload = () => {
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    setDarkMode()
    console.log("dark")
  }
  else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
    setLightMode()
  }
  else {
    setDarkMode
  }
}

function setDarkMode() {
  const bookCards = document.querySelectorAll(".book-card");
  const libraryFunctionBtns = document.querySelectorAll("[class*=button]");
  bookCards.forEach(card => card.classList.add("dark"));
  libraryFunctionBtns.forEach(button => button.classList.add("dark"));
  header.classList.add("dark");
  main.classList.add("dark");
  headerTitle.classList.add("dark");

  darkThemeToggled = true;
  themeToggleBtn.textContent = "Light Mode";
}

function setLightMode() {
  const bookCards = document.querySelectorAll(".book-card");
  const libraryFunctionBtns = document.querySelectorAll("[class*=button]");
  bookCards.forEach(card => card.classList.remove("dark"));
  libraryFunctionBtns.forEach(button => button.classList.remove("dark"));
  header.classList.remove("dark");
  main.classList.remove("dark");
  headerTitle.classList.remove("dark");

  darkThemeToggled = false;
  themeToggleBtn.textContent = "Dark Mode";
}
