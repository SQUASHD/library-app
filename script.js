let myLibrary = []

function Book(title, author, pageCount, readStatus) {
  this.title = title
  this.author = author
  this.pageCount = pageCount
  this.readStatus = Boolean(readStatus)

  this.getInfo = function () {
    var checkIfReadString;

    if(this.readStatus) {
      checkIfReadString = 'already read'
    }
    else {
      checkIfReadString = 'not read yet'
    }
    return `${this.title} by ${this.author}, ${this.pageCount} pages, ${checkIfReadString}.`
  }
}

function addBookToLibrary(book) {
  myLibrary.push(book)
}