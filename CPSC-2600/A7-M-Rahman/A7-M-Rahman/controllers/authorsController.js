import { getAllAuthors, getAuthorById, getBooksByAuthorId } from "../models/authorsModel.js";

/**
 * GET /api/v1/authors
 * Returns all authors
 */
export function listAuthors(req, res) {
  const authors = getAllAuthors();
  res.json(authors);
}

/**
 * GET /api/v1/authors/:id
 * Returns one author and the books written by them
 */
export function getAuthor(req, res) {
  const id = req.params.id;

  // Get author
  const author = getAuthorById(id);

  if (!author) {
    return res.status(404).json({
      status: 404,
      message: "Author not found"
    });
  }

  // Get books written by this author
  const books = getBooksByAuthorId(id);

  // Add link property for each book
  books.forEach((book) => {
    book.link = `/api/v1/books/${book.id}`;
  });

  // Attach books to author object
  author.books = books;

  res.json(author);
}