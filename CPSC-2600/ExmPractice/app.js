import express from "express";

import validateEntry from "./validate.js";

const app = express();

app.use(express.static("public"));

//the server
const servert = app.listen(3000, () =>{
    console.log("Server listening on port 3000");
})

app.set("views", "./view");
app.set("view engine", "ejs");

app.use(express.urlencoded({extended: true}));
        
app.post("/orders", validateEntry, (req, res) =>{
    if(res.locals.errors.length >0){
        return res.render("error",{
            errors: res.locals.errors,
            formData: res.locals.formData
        })
    }
    res.render("success", {formData: res.locals.formData});             
})
