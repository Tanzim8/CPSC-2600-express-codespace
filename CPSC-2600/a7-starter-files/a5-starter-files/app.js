//Task 0
import express from "express";

const app = express();

const server = app.listen(3000, ()=>{
    console.log("listening on 3000");
});


//added to make task 6 work
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

//the database implementation
import {DatabaseSync} from "node:sqlite";
import path from "node:path";
const db = new DatabaseSync(
    path.join(import.meta.dirname, '/longlist-advance.db')
);

//Task 1

app.get("/api/v1/authors",(req, res)=>{
    let authors;
    authors = db.prepare(`
            SELECT * FROM authors;`
        ).all();

        res.json(authors);

});

//Task 2
app.get("/api/v1/books",(req, res)=>{
    let books;
    let queryParam = req.query.page;
    const limit = 10;
    let format = req.query.format || "hardcover";
    if(queryParam == undefined){
        queryParam = 1;
    }
    let offset = (queryParam -1) * limit;
    const query = 
        `SELECT 
        books.id, books.isbn, books.title, books.format, books.year
        FROM books
        WHERE books.format = ?
        LIMIT ? OFFSET ? 
        ;`

    books = db.prepare(query).all(format, limit, offset);
    res.json(books);
});

app.get("/api/v1/books/:id", (req, res) => {
  const id = req.params.id;

  const book = db.prepare(`
    SELECT *, publishers.publisher
    FROM books
    JOIN PUBLISHERS ON books.publisher_id = publishers.id
    WHERE books.id = ?;
  `).get(id);

  let authors = db.prepare(
    `SELECT authors.id, authors.name FROM books
    JOIN authored ON books.id = authored.book_id
    JOIN authors ON authored.author_id = authors.id
    WHERE books.id = ?;
    `
  ).all(id);
  authors.forEach((author) => {
    author.link = `/api/v1/authors/${author.id}`;
  });

  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }
  book.authors = authors;

  res.json(book);
});

app.get('/api/v1/authors/:id', (req, res)=>{
    let id = req.params.id;
    console.log("Author ID requested:", id);
    let authors = db.prepare(
        `SELECT * FROM authors
        WHERE id =?;
        `
    ).get(id);

    if (!authors) {
        return res.status(404).json({ message: "Author not found" });
    }

    let books = db.prepare(
        `
        SELECT books.id, books.title 
        FROM books 
        JOIN authored on books.id = authored.book_id
        WHERE authored.author_id = ?;
        `
    ).all(id);

    books.forEach((book) =>{
        book.link=`/api/v1/books/${book.id}`;

    });
    authors.books = books;
    res.json(authors);
})

app.post("/api/v1/reviews",(req, res)=>{
    // const { reviewer, rating, book_id, comment } = req.body;

    const reviewer = req.body.reviewer;
    const rating = Number(req.body.rating);
    const book_id = Number(req.body.book_id);
    const comment = req.body.comment;
    if(!reviewer || !rating || !book_id){
        return res.status(400).json({ message: "Missing required fields" });
    }

    if(rating < 0 || rating > 5){
        return res.status(400).json({ message: "Rating must be between 0 and 5" });
    }

    const insert = db.prepare(
        `
        INSERT INTO reviews (reviewer, rating, book_id, comment)
        VALUES (?, ?, ?, ?);
        `
    )
    const result = insert.run(reviewer, rating, book_id, comment);

      const newId = result.lastInsertRowid;

  // Location header
  const reviewPath = `/api/v1/reviews/${newId}`;
  res.set("Location", reviewPath);

  // response body
  res.status(201).json({
    status: 201,
    message: "Review created successfully",
    links: {
      by_review_id: reviewPath,
      by_book_id: `/api/v1/reviews?book_id=${bookId}`
    },
    review: {
      id: newId,
      reviewer: reviewer,
      rating: rating,
      book_id: bookId,
      comment: comment
    }
});
})
