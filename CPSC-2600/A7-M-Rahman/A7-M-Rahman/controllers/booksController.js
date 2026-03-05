import { getBooks, getBookById, getAuthorsForBook } from "../models/booksModel.js";

export function listBooks(req, res) {
  let page = req.query.page;
  const limit = 10;
  const format = req.query.format || "hardcover";

  if (page === undefined || isNaN(Number(page))) {
    return res.status(422).json({
      status: 422,
      message: "Query parameter 'page' is required and must be a number"
    });
  }

  page = Number(page);
  const offset = (page - 1) * limit;

  const books = getBooks(format, limit, offset);
  res.json(books);
}

export function getBook(req, res) {
  const id = req.params.id;

  const book = getBookById(id);
  if (!book) {
    return res.status(404).json({ status: 404, message: "Book not found" });
  }

  const authors = getAuthorsForBook(id);
  authors.forEach(a => a.link = `/api/v1/authors/${a.id}`);
  book.authors = authors;

  res.json(book);
}