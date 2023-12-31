const mongoose = require("mongoose");
const Joi = require("joi");
const { genreSchema } = require("./genre");

const Movie = mongoose.model(
  "Movie",
  new mongoose.Schema({
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 50,
    },
    genre: {
      type: genreSchema,
      require: true,
    },
    numberInStock: {
      type: Number,
      required: true,
      minlength: 5,
      maxlength: 255,
    },
    dailyRentalRate: {
      type: Number,
      required: true,
      minlength: 5,
      maxlength: 255,
    },
  })
);

function validateMovie(movie) {
  const schema = Joi.object({
    title: Joi.string().min(3).required(),
    genreId: Joi.string().require(),
    numberInStock: Joi.number().min(0).required(),
    dailyRentalRate: Joi.number().min(0).required(),
  });

  return schema.validate(genre);
}
exports.Movie = Movie;
exports.validate = validateMovie;
