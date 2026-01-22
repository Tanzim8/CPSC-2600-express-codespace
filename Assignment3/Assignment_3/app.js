//The express imoport statement
import express from 'express';

//The express and server
const app = express();
const server = app.listen(3000,()=> console.log("Server listening on 3000!"));

//The first massage
app.get('/', (req, res)=>{
    res.send("<h1>Welcome to Assignment 3</h1>");
})

//The ROUTE which looks files inside the public folder
app.get('/pages/:filename',(req,res)=>{
    res.sendFile(req.params.filename, {root: 'public'});
});