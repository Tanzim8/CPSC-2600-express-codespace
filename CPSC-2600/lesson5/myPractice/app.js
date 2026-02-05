import express from "express";

const app = express();

//server

const server = app.listen(3000, ()=>console.log("Listening on 3000"));

app.use(express.static("public"));
//the database part
import { DatabaseSync } from "node:sqlite";

import path from "node:path";

const db = new DatabaseSync(path.join(import.meta.dirname, '/longlist-advance.db'));
console.log(db);

//the book inquiry
app.get('/books', (req, res)=>{
    let books;
    if(req.query.year){
        books = db.prepare(
            `SELECt * FROM BOOKS
            WHERE year = ? OR year=?;
            ;`
        ).all(
            req.query.year[0],
            req.query.year[1]
        );
    }else{
        books = db.prepare(`SELECT * FROM books;`).all();
    }

    res.json(books);

});