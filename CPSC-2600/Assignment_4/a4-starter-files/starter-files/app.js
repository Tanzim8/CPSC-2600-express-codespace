import express from "express";
import validatePizza, { colorValidator } from "./my-validators.js";

const app = express();

app.set("view engine", "ejs");

// Middleware
app.use(express.urlencoded({ extended: true }));

// Task 7: GET / must be BEFORE static
app.get("/", colorValidator, (req, res) => {
  res.render("index", { bgColor: res.locals.bgColor });
});

// Static after GET /
app.use(express.static("public"));

// POST /orders
app.post("/orders", validatePizza, (req, res) => {
  if (res.locals.errors.length > 0) {
    return res.render("error", {
      errors: res.locals.errors,
      formData: res.locals.formData
    });
  }

  res.render("success", { formData: res.locals.formData });
});

// Error handler (keep at bottom)
app.use((err, req, res, next) => {
  console.log(err);
  res.status(err.status || 500).send("Server error - check terminal");
});

app.listen(3000, () => {
  console.log("Server listening on 3000!");
});
