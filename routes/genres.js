const { Genre, validate } = require("../models/genre");
const express = require("express");
const router = express.Router();

//get all genres
router.get("/", async (req, res) => {
  const genres = await Genre.find().sort("name");
  res.send(genres);
});

//create a genre
router.post("/", async (req, res) => {
  //validate
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  let genre = new Genre({
    name: req.body.name,
  });
  genre = await genre.save();

  res.send(genre);
});

//put
router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const genre = await Genre.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    {
      new: true,
    }
  );

  if (!genre) res.status(404).send("The genre with the id is not found");
  res.send(genre);
});

// app.delete();
router.delete("/:id", async (req, res) => {
  const genre = await Genre.findByIdAndDelete(req.params.id);
  if (!genre)
    res.status(404).send("The course with the given id was not found");
  res.send(genre);
});

//get genre by id
router.get("/:id", async (req, res) => {
  const genre = await Genre.findById(req.params.id);
  if (!genre) res.status(404).send("The genre with the id is not found");
  res.send(genre);
});

module.exports = router;
