import express from "express";

const app = express()


//Task 2 : The middleware

const theAssignmentMiddleWare = (req, res, next)=>{
    res.locals.message = "This is the middleWare!!";
    next();
}

app.use(theAssignmentMiddleWare);

//The static Method
app.use(express.static("public"));

//The urlencoded middleware
app.use(express.urlencoded({extended : true}));

//It opens up the langara pizza page with css styles.
app.get("/", (req,res)=>{
    res.send(`Server Running!`);
})

//Task 4: The route handler for '/Orders'
app.get("/orders", (req, res)=>{
    res.json(req.body);
})

const server = app.listen(3000,() =>{
    console.log("Server listening on 3000!");
} )