import express from 'express';
const app = express();
app.listen(3000, ()=>console.log("listening on 3000"));

app.use(express.static('public'));