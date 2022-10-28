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

const modal = document.getElementById("myModal");
const modalContent = document.querySelector(".modal-content")
const form = document.getElementById("add-book-form")
const submitBtn = document.querySelector(".submit-btn")
const title = document.getElementById("title")
const author = document.getElementById("author")
const pageCount = document.getElementById("page-count")
const readStatus = document.getElementById("read-status")

let myLibrary = []

const Book = (title, author, pageCount, readStatus, generated = false) => {

  const createBookCard = () => {
    const bookCard = document.createElement("div")
    bookCard.classList.add("book-card")

    const bookTitle = document.createElement("h2")
    bookTitle.classList.add("book-title")
    bookTitle.textContent = `"${title}"`

    const bookAuthor = document.createElement("h3")
    bookAuthor.classList.add("book-author")
    bookAuthor.textContent = author

    const bookPageCount = document.createElement("p")
    bookPageCount.classList.add("book-page-count")
    bookPageCount.textContent = pageCount + " pages"

    const buttonGroup = document.createElement("div")
    buttonGroup.classList.add("button-group")
    const readStatusBtn = document.createElement("div")
    readStatusBtn.classList.add("book-btn")
    buttonGroup.appendChild(readStatusBtn)
    const removeBtn = document.createElement("div")
    removeBtn.classList.add("book-btn", "remove-button", "button")
    buttonGroup.appendChild(removeBtn)

    if(readStatus) {
      readStatusBtn.textContent = "Read"
      readStatusBtn.classList.add("read")
    }
    else {
      readStatusBtn.textContent = "Not Read"
      readStatusBtn.classList.add("not-read")
    }

    if (generated) {
      bookCard.classList.add("generated")
    }

    if (darkThemeToggled) {
      bookCard.classList.add("dark")
      readStatusBtn.classList.add("dark")
      removeBtn.classList.add("dark")
    }

    removeBtn.textContent = "Remove"

    readStatusBtn.addEventListener("click", () => {
      toggleReadStatus(readStatusBtn, this);
    })

    removeBtn.addEventListener("click", () => {
      bookCard.remove()
    })

    bookCard.append(bookTitle, bookAuthor, bookPageCount, buttonGroup)
    booksGrid.appendChild(bookCard)

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
  }

  const addBookToLibrary = () => {
    myLibrary.push(Book)
  }
  return {title, author, pageCount, readStatus, generated, createBookCard, addBookToLibrary}
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

  const book = Book(title.value, author.value, pageCount.value, readStatus.checked)
  book.addBookToLibrary()
  modal.style.display = "none";
  form.reset()

  book.createBookCard()
})

generateBooksBtn.addEventListener("click", () => {
  if (booksGenerated) {
    alert("Books already generated")
    return
  }

  for (let i = 0; i < 10; i++) {
    const book = Book(`Book ${i + 1}`, `Author ${i + 1}`, Math.floor(Math.random() * 1000), Math.round(Math.random()), true)
    book.createBookCard()
  }

  booksGenerated = true;
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

themeToggleBtn.addEventListener("click", () => toggleDarkMode())

function toggleDarkMode() {
  const bookCards = document.querySelectorAll(".book-card");
  const libraryFunctionBtns = document.querySelectorAll(".button");
  const darkModeToggleable = document.querySelectorAll(".dark-mode");

  bookCards.forEach(card => card.classList.toggle("dark"));
  libraryFunctionBtns.forEach(button => button.classList.toggle("dark"));
  darkModeToggleable.forEach(element => element.classList.toggle("dark"));
  header.classList.toggle("dark");
  main.classList.toggle("dark");
  headerTitle.classList.toggle("dark")
  modalContent.classList.toggle("dark")

  const toggleTextContent = darkThemeToggled ? "Dark Mode" : "Light Mode";
  themeToggleBtn.textContent = toggleTextContent;
  darkThemeToggled = !darkThemeToggled;
}

window.onload = () => {
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
  }
  else {
    toggleDarkMode()
  }
}