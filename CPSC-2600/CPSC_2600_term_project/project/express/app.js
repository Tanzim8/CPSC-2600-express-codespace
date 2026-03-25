import express from "express";
import coursesRouter from "./routes/coursesRouter.js"

import db from "./models/db.js"

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/", (req, res)=>{
    res.send("Langara Engineering Enrolment API is running");
})

app.get("/test-db",(req,res)=>{
    const courses = db.prepare(
        `SELECT * FROM courses`
    ).all();
    res.json(courses);
})

app.use("/api/v1/courses", coursesRouter)

app.listen(PORT, ()=>{
    console.log(`Server is listening on port ${PORT}`);
})