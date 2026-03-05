import { insertReview, getReviewById, getReviews } from "../models/reviewsModel.js";

export function createReview(req, res) {
  const reviewer = req.body.reviewer;
  const rating = Number(req.body.rating);
  const book_id = Number(req.body.book_id);
  const comment = req.body.comment || null;

  if (!reviewer || Number.isNaN(rating) || Number.isNaN(book_id)) {
    return res.status(422).json({
      status: 422,
      message: "reviewer, rating, and book_id are required and must be valid"
    });
  }

  if (rating < 0 || rating > 5) {
    return res.status(422).json({
      status: 422,
      message: "rating must be between 0 and 5"
    });
  }

  const result = insertReview(reviewer, rating, book_id, comment);
  const newId = Number(result.lastInsertRowid);

  const reviewPath = `/api/v1/reviews/${newId}`;
  res.set("Location", reviewPath);

  res.status(201).json({
    status: 201,
    message: "Created",
    links: {
      by_review_id: reviewPath,
      by_book_id: `/api/v1/reviews?book_id=${book_id}`
    },
    review: {
      id: newId,
      reviewer,
      rating,
      book_id,
      comment
    }
  });
}

export function listReviews(req, res) {
  const bookId = req.query.book_id ? Number(req.query.book_id) : null;

  if (req.query.book_id !== undefined && Number.isNaN(bookId)) {
    return res.status(422).json({
      status: 422,
      message: "book_id must be a number"
    });
  }

  const reviews = getReviews(bookId);
  res.json(reviews);
}

export function getReview(req, res) {
  const id = req.params.id;

  const review = getReviewById(id);
  if (!review) {
    return res.status(404).json({
      status: 404,
      message: "Review not found"
    });
  }

  res.json(review);
}