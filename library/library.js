const myLibrary = [];

const bookContent = document.querySelector(".book-content");
const new_button = document.querySelector(".new-book");
const dialog = document.querySelector(".new-book-dialog");
const form = document.getElementById("newBookForm");
const cancelBtn = document.getElementById("cancelBtn");

function Book(title, author, id) {
  this.title = title;
  this.author = author;
  this.id = id;
}

function addBookToLibrary(title, author) {
  myLibrary.push(new Book(title, author, crypto.randomUUID()));
}

function showLibrary() {
  bookContent.innerHTML = "";
  myLibrary.forEach((book) => {
    const bookArea = document.createElement("div");
    bookArea.className = "book";
    bookArea.dataset.id = book.id;
    const titleEl = document.createElement("h3");
    titleEl.textContent = book.title;
    const authorEl = document.createElement("p");
    authorEl.textContent = "Author : " + book.author;

    const delte_btn = document.createElement("button");
    delte_btn.type = "button";
    delte_btn.textContent = "Delete";
    delte_btn.dataset.action = "delete";

    bookArea.appendChild(titleEl);
    bookArea.appendChild(authorEl);
    bookArea.appendChild(delte_btn);

    bookContent.appendChild(bookArea);
  });
}

new_button?.addEventListener("click", () => {
  dialog?.showModal();
  form?.elements?.title?.focus();
});

bookContent?.addEventListener("click", (e) => {
  const btn = e.target.closest('button[data-action="delete"]');
  if (!btn) return;
  const bookDiv = btn.closest(".book");
  const id = bookDiv?.dataset?.id;
  if (!id) return;
  const idx = myLibrary.findIndex((b) => b.id === id);
  if (idx !== -1) {
    myLibrary.splice(idx, 1);
    showLibrary();
  }
});

form?.addEventListener("submit", (e) => {
  e.preventDefault();
  const title = form.elements.title.value.trim();
  const author = form.elements.author.value.trim();
  if (!title || !author) return;
  addBookToLibrary(title, author);
  form.reset();
  showLibrary();
  dialog.close();
});

cancelBtn?.addEventListener("click", () => dialog.close());
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && dialog?.open) dialog.close();
});

addBookToLibrary("book1", "author1");
addBookToLibrary("book2", "author2");
addBookToLibrary("book3", "author3");
showLibrary();
