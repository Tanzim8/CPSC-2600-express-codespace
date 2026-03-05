import express from "express";
import apiRouter from "./routes/index.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use("/api/v1", apiRouter);

app.listen(3000, () => {
  console.log("listening on 3000");
});