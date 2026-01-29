import express from 'express';

const app = express();
//the welcome listening massege


const ourFirstMiddleWare = (req, res, next) =>{
    res.locals.message = "Hello middleware! ";
    next();
}
app.use(ourFirstMiddleWare);


const middlewareForC = (req, res, next) =>{
    res.locals.massegeForC = "Hello from C!!!!"
    next();
}

app.use(middlewareForC);


app.use(express.static('public-files'));

//The welcome massege
app.get("/",(req, res) =>{
    res.send(`<h1>Welcome the app again!!</h1><p>${res.locals.message}</p>`);
})

app.get('/C', (req,res) =>{
    res.send(`Endpoint C ${res.locals.massegeForC}`);
})

app.get("/test.html", (req, res)=>{
    res.send("test.html");
})

const validation = (req, res, next)=>{
    //make a property in res.locals for storing the error messege
    res.locals.errorMessage = "";

    if(req.body.studentNumber < 100 || req.body.studentNumber > 999){
        res.locals.errorMessage("ERROR!! Student Number must have 3 digits!!");
    }
    next();
}


app.post("/courses", [validation], (req, res)=>{
    res.send(`<h1>Successfull Submission</h1>
            <p>Error message: ${res.locals.errorMessage}</p>
            <p>${req.body.lastName}</p>
            <p>Student Number: ${req.body.studentNumber}</p>
            <p>For course: ${req.body.courseNumber}</p>`
    );
})
const server = app.listen(3000,() => console.log("Listening from port 3000!"));

