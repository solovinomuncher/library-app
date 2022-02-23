let myLibrary = [];

function Book(author, title, year, pages, hasRead) {
  this.author = author;
  this.title = title;
  this.year = year;
  this.pages = pages;
  this.hasRead = hasRead;
}

console.log(myLibrary);

function addBookToLibrary(author, title, year, pages, hasRead) {
  let newBook = new Book(author, title, year, pages, hasRead);
  myLibrary.push(newBook);
}

addBookToLibrary("Mark Manson", "Models", 2011, 262, true);
addBookToLibrary("David Allen", "Getting Things Done", 2001, 267, true);

console.log(myLibrary);

function displayBooks() {
  let dataIndex = 0;

  let main = document.querySelector(".main");
  removeAllChildNodes(main);

  myLibrary.forEach((book) => {
    let div = document.createElement("div");
    let removeBookBtn = document.createElement("button");
    let toggleReadBtn = document.createElement("button");
    let main = document.querySelector(".main");

    div.textContent = "";
    div.classList.add("card");
    div.setAttribute("data-index", dataIndex);
    removeBookBtn.setAttribute("data-index", dataIndex);
    toggleReadBtn.setAttribute("data-index", dataIndex);

    dataIndex += 1;

    removeBookBtn.textContent = "Remove";
    removeBookBtn.classList.add("btn-removebook");

    toggleReadBtn.textContent = "Toggle Read";
    toggleReadBtn.classList.add("btn-toggleread");

    for (let prop in book) {
      let propDiv = document.createElement("div");

      propDiv.textContent = `${prop}: ${book[prop]}`;

      div.appendChild(propDiv);
    }

    div.appendChild(removeBookBtn);
    div.appendChild(toggleReadBtn);
    main.appendChild(div);
  });

  addRemoveEventListener();
  addToggleReadEventListener();
}

displayBooks();

// helper function: remove all child nodes
function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

// toggling new book form via new form button
const newBookBtn = document.querySelector(".btn-newbook");

newBookBtn.addEventListener("click", toggleForm);

function toggleForm() {
  let form = document.querySelector(".form__newbook");
  form.classList.toggle("hide");
}

// submit button event handler
const submitBtn = document.querySelector(".btn-submit");

submitBtn.addEventListener("click", submit);

function submit(e) {
  e.preventDefault();

  let authorInput = document.querySelector("#author");
  let titleInput = document.querySelector("#title");
  let yearInput = document.querySelector("#year");
  let pagesInput = document.querySelector("#pages");
  let hasReadInput = document.querySelector("#hasRead");

  let trueYear = parseInt(yearInput.value);
  let truePages = parseInt(pagesInput.value);

  addBookToLibrary(
    authorInput.value,
    titleInput.value,
    trueYear,
    truePages,
    hasReadInput.checked
  );

  authorInput.value = "";
  titleInput.value = "";
  yearInput.value = "";
  pagesInput.value = "";

  toggleForm();

  displayBooks();
}

// remove button event handler
function addRemoveEventListener() {
  const removeBookBtn__all = document.querySelectorAll(".btn-removebook");

  removeBookBtn__all.forEach((btn) => {
    btn.addEventListener("click", remove);
  });
}

function remove(e) {
  e.preventDefault();

  let dataIndex = parseInt(e.target.getAttribute("data-index"));
  myLibrary.splice(dataIndex, 1);

  displayBooks();
}

// toggle read button event handler
function addToggleReadEventListener() {
  const toggleReadBtn__all = document.querySelectorAll(".btn-toggleread");

  toggleReadBtn__all.forEach((btn) => {
    btn.addEventListener("click", toggleRead);
  });
}

function toggleRead(e) {
  e.preventDefault();

  let dataIndex = parseInt(e.target.getAttribute("data-index"));

  myLibrary[dataIndex].hasRead = !myLibrary[dataIndex].hasRead;

  displayBooks();
}
