import express from "express";
import validatePizza, { colorValidator} from "./my-validators.js";



const app = express()
app.set('view engine', 'ejs');


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

//Task: 5
app.post("/orders", validatePizza, (req, res) => {
    
    if (res.locals.errors.length > 0) {
        return res.render("error", {
            errors: res.locals.errors,
            formData: res.locals.formData
        });
    }

    res.render("success", {
        formData: res.locals.formData
    });
});

app.use((err, req, res, next) => {
    console.log(err); // <-- shows the real reason in terminal
    res.status(err.status || 500).send("Server error - check terminal");
});

//task: 7
app.get("/", colorValidator, (req, res) => {
    res.render("index", {
        bgColor: res.locals.bgColor
    });
});


const server = app.listen(3000,() =>{
    console.log("Server listening on 3000!");
} )