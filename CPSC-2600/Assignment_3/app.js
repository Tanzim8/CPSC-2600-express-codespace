//The express imoport statement
import express from 'express';

//importing the data from data.js
import data from './data.js';

//The express and server
const app = express();
const server = app.listen(3000,()=> console.log("Server listening on 3000!"));


//Task2: The ROUTE which looks files inside the public folder
app.get('/pages/:filename',(req,res)=>{
    res.sendFile(req.params.filename, {root: 'public'});
});

//Task 3: The redirect task!
app.get(["/", "/pages"], (req, res)=>{
    //pages/ index.html here pages actually refers to the older route of task 2
    res.redirect("/pages/index.html");
})     

//Task 4: The route which finds bands from id and returns json using js's array find method

app.get("/api/music/:id",(req, res)=>{

    // Finding the bands using the entered id
    const band = data.find(band => band.id === req.params.id);
    res.json(band);
})

//Task 5: using the renderAlbumPagr function in the root
import renderAlbumPage from './our-modules/renderAlbumPage.js';
app.get('/music-pages/:bandId/:albumId',(req, res)=>{
    res.send(renderAlbumPage(req.params.bandId, req.params.albumId));
})
