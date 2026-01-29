import express from "express";

const app = express();
const server = app.listen(3000, () => console.log("listening on 3000!!"))

app.get("/", (req, res) =>{
    res.send("Welcome to the program!!!");
})

//CHALLENGE: when 1 visits the url and "//...3000.app.github.dev.pets"
//They should see "Welcome to our pets website!!!"

app.get("/pets",(req, res)=>{
    res.send("<h1>Welcome to our pets website!!!</h1> <a href='/pets/dogs'>Info About Dogs</a>");
})
//challenge: when 1 visits the url and "//...3000.app.github.dev.dogs"
//They should see "Dogs are great as pets!!!"
app.get("/pets/dogs", (req, res)=>{
    res.send("Dogs are great as pets!!!");
})

const petTypes = {
    cat : "small and furry",
    bird: "feathered and can fly",
    fish: "scaly and swims in water"
}

//Route parameter
app.get("/pets/:petType", (req, res)=>{
    // res.send(`You have choosen to get info about the pet type ${req.params.petType}!<>
    //     description: ${petTypes[req.params.petType] || "Pet type not found! 404!!"}`);
    if(petTypes[req.params.petType] == undefined){
        res.status(404).send("pet type not found! 404!!");
    }else{
        res.status(200).send("You have choosen to get info about the pet type " + req.params.petType + "!<br> description: " + petTypes[req.params.petType]);
    }
})

//CHALLENGE: send the description for the choosen pet type from the URL path, if the pet type doesn't exists, send "Pet type not found! 404!!"

//so far text and html but now some other!!!
//JSON response
//any kind of files!!
app.get('/all-pets', (req, res)=>{
    res.json(petTypes);
})

app.get('/pages/index', (req, res)=>{
    res.sendFile("/files/index.html", {root: import.meta.dirname});
})

//CHALLENGE: Make the css file work and the server has to accept request for /pages/style.css' and send 'files/style.css'
app.get("/pages/style.css", (req, res)=>{
    res.sendFile("/files/styles.css", {root: import.meta.dirname});
})