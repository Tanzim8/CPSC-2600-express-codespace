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

//Task 3: 
app.get('/api/v1/books/:isbn',(req, res)=>{
    let isbn = req.params.isbn;
    let book;
    //commented out the original query for Task : 3 and updated it for Task : 4

    // const query = 
    // `SELECT * FROM books
    // WHERE books.isbn = ? `;

    //updated quert for Task : 4
    const query = 
        `SELECT books.*, publishers.publisher
        FROM books
        JOIN publishers ON books.publisher_id = publishers.id
        WHERE books.isbn = ? `;
    //Task 5
    let ratingsQuery = `
    SELECT books.*,ratings.rating
        FROM books
        --TASK: 5
        JOIN ratings ON books.id = ratings.book_id
        WHERE books.isbn = ? ;`

    const booksRatings = db.prepare(ratingsQuery).all(isbn);
    let totalRatingsQuery = 0;
    let totalRatings = 0;

    booksRatings.forEach((entry)=>{
        totalRatingsQuery += entry.rating;
        totalRatings ++;
    })

    let averageRating = totalRatingsQuery / totalRatings;

    book = db.prepare(query).all(isbn);
    book[0].averageRating = averageRating;
    res.json(book);
})

//Task 6
// app.post('/api/v1/ratings', (req, res)=>{
//     let id = req.body.book_id;
//     let ratings = req.body.rating;

//     const query = `
//     INSERT INTO ratings (book_id, rating) VALUES (?, ?)`;

//     db.prepare(query).run(id, ratings);
//     res.json({message: "Rating added successfully"});
// })