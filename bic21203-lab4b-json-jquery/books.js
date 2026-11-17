"use strict";

const outputEl = document.getElementById("output");
const errorEl  = document.getElementById("error");

// Helper: create a paragraph with safe text and append it
function addLine(text) {
  const p = document.createElement("p");
  p.textContent = text;               // textContent = safe, no HTML injection
  outputEl.appendChild(p);
}

async function loadBooks() {
  try {
    const response = await fetch("books.json");        // must be served over http
    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }

    const data = await response.json();               // throws on invalid JSON
    const books = data.books;

    if (!Array.isArray(books) || books.length < 2) {
      throw new Error("Unexpected data format");
    }

    // (a) Title of the first book
    addLine(`First book title: ${books[0].title}`);

    // (b) Author of the second book
    addLine(`Second book author: ${books[1].author}`);

    // (c) Genres of both books, grouped by title
    books.forEach(book => {
      addLine(`${book.title} — ${book.genres.join(", ")}`);
    });

  } catch (err) {
    errorEl.hidden = false;
    errorEl.textContent =
      "Sorry — we could not load the book data. Please try again later.";
    console.error("Failed to load books.json:", err);
  }
}

loadBooks();