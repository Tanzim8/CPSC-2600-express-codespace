import db from "./db.js";

export function getAllAuthors() {
  return db.prepare(`SELECT * FROM authors;`).all();
}

export function getAuthorById(id) {
  return db.prepare(`
    SELECT *
    FROM authors
    WHERE id = ?;
  `).get(id);
}

export function getBooksByAuthorId(authorId) {
  // (one query, 2 joins) authors -> authored -> books
  return db.prepare(`
    SELECT books.id, books.title
    FROM authors
    JOIN authored ON authors.id = authored.author_id
    JOIN books ON authored.book_id = books.id
    WHERE authors.id = ?;
  `).all(authorId);
}