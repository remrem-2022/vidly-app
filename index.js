//external modules
const express = require("express");
const mongoose = require("mongoose");

//routes variables
const home = require("./routes/home");
const genres = require("./routes/genres");
const customers = require("./routes/customers");

//connect to db
mongoose
  .connect("mongodb://127.0.0.1:27017/vidly-app")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch(() => {
    console.log("could not connect ot mongo db");
  });

//app
const app = express();

//middleware
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//set view
app.set("view engine", "pug");
app.set("views", "./views");

//home
app.use("/", home);
//genre
app.use("/api/genres", genres);
//cutomer
app.use("/api/customers", customers);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening to ${port}`);
});
