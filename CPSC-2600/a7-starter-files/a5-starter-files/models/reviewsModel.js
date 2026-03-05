import db from "./db.js";

export function insertReview(reviewer, rating, book_id, comment) {
  const stmt = db.prepare(`
    INSERT INTO reviews (reviewer, rating, book_id, comment)
    VALUES (?, ?, ?, ?);
  `);
  return stmt.run(reviewer, rating, book_id, comment);
}

export function getReviewById(id) {
  return db.prepare(`
    SELECT *
    FROM reviews
    WHERE id = ?;
  `).get(id);
}

export function getReviews(bookId = null) {
  if (bookId) {
    return db.prepare(`
      SELECT *
      FROM reviews
      WHERE book_id = ?;
    `).all(bookId);
  }

  return db.prepare(`
    SELECT *
    FROM reviews;
  `).all();
}