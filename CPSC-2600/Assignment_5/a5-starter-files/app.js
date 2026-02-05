//Task 0
import express from "express";

const app = express();

const server = app.listen(3000, ()=>{
    console.log("listening on 3000");
});

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