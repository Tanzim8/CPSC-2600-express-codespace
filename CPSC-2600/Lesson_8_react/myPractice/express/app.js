import express from "express";

const app = express();

//server
const server= app.use(3000,(req, res)=>{
    console.log("Running on 3000!!");
})

app.use(express.static("public"));