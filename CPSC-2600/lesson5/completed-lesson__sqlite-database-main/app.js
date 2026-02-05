import express from 'express';
const app = express();
const server = app.listen(3000,()=>console.log("listening on 3000"));

// Serve static files from the public folder
app.use(express.static("public"));

// Connect our application tothe longlist-advance.db database using the default Node.js implementation of the SQLite driver. This driver is experimental and does not yet have all features, but it's being updated all the time.
import { DatabaseSync } from 'node:sqlite';
import path from 'node:path';
const db = new DatabaseSync(path.join(import.meta.dirname, '/longlist-advance.db'));
// console.log(db);
// CHALLENGE: make the first hyperlink work, but just have it send a text response that says "testing"

app.get('/books', (req,res)=>{
    // Make a query to the datbase to get all books
    let books;
    if(req.query.year) {
      // Use the years to limit the results   
      books = db.prepare(`
        SELECT * FROM books
        WHERE year=? OR year=?;
        ;`).all(
            // Two values here
            req.query.year[0],
            req.query.year[1]
        );
    }
    else {
        books = db.prepare(`SELECT * FROM books;`).all();
    }
    
    // db.prepare makes a prepared statement (which is a query that has been processed and is ready to be run) and .all() is used to run the query in the prepared statement and get all results
    res.json(books);
});
// CHALLENGE: get all the book records from the database and send them to the client as a JSON object.

app.get('/authors', (req,res)=>{
    let country = req.query.country;
    let authors;
    if(country) {
        // ? is a placeholder for an embedded value. The placeholder will be replaced by the value passed into .all() when the query is executed. This is a security measure to sanitize values before embedding them in the query
        authors = db.prepare(`
            SELECT * FROM authors 
            WHERE country=?;
            `).all(country);
    }
    else {
        authors = db.prepare(`SELECT * FROM authors;`).all();
    }
    res.json(authors);
});

// Conventionally, if the client is requesting a collection of resources, any parameters that place conditions on the collection (like country or years in our example today) are sent as URL query parameters. However, if the client is requesting a SINGLE resource, conventionally the parameter indication WHICH resource they want is sent as a route or path parameter like /books/:book-id
