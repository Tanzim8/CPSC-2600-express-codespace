import { DatabaseSync } from "node:sqlite";
import path from "node:path";

const db = new DatabaseSync(path.join(import.meta.dirname, "../longlist-advance.db"));

export function getBooks(format, limit, offset) {
  return db.prepare(`
    SELECT books.id, books.isbn, books.title, books.format, books.year
    FROM books
    WHERE books.format = ?
    LIMIT ? OFFSET ?;
  `).all(format, limit, offset);
}

export function getBookById(id) {
  return db.prepare(`
    SELECT books.*, publishers.publisher
    FROM books
    JOIN publishers ON books.publisher_id = publishers.id
    WHERE books.id = ?;
  `).get(id);
}

export function getAuthorsForBook(id) {
  return db.prepare(`
    SELECT authors.id, authors.name
    FROM books
    JOIN authored ON books.id = authored.book_id
    JOIN authors ON authored.author_id = authors.id
    WHERE books.id = ?;
  `).all(id);
}