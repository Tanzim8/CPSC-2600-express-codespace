import express from "express";

const app = express();
const server = app.listen(3000, () => console.log("listening on 3000!!"))

app.get("/", (req, res) =>{
    res.send("Welcome to the program!!!");
})

//CHALLENGE: when 1 visits the url and "//...3000.app.github.dev.pets"
//They should see "Welcome to our pets website!!!"