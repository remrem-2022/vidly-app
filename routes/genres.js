const express = require('express');
const router = express.Router();
const Joi = require('joi');
router.use(express.json());


const genres = [
  { id: 1, name: "sci-fi" },
  { id: 2, name: "horror" },
  { id: 3, name: "comedy" },
  { id: 4, name: "action" },
]

//get all genres
router.get('/', (req, res) => {
  res.send(genres)
})

//get genre
router.get('/:id', (req, res) => {
  const genre = genres.find(c => c.id === parseInt(req.params.id));
  if (!genre) res.status(404).send('The genre with the id is not found');
  res.send(genre);
})


//create a genre
router.post('/', (req, res) => {
  //validate
  const { error } = validateGenre(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const genre = {
    id: genres.length + 1,
    name: req.body.name
  };
  genres.push(genre);
  res.send(genre);
})

//put
router.put('/:id', (req, res) => {
  const genre = genres.find(c => c.id === parseInt(req.params.id));
  if (!genre) res.status(404).send('The genre with the id is not found');
  const { error } = validateGenre(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  genre.name = req.body.name;
  res.send(genre);
})


// app.delete(); 
router.delete('/:id', (req, res) => {
  const genre = genres.find(c => c.id === parseInt(req.params.id));
  if (!genre) res.status(404).send('The course with the given id was not found')

  const index = genres.indexOf(genre);
  genres.splice(index, 1);
  res.send(genre);
})

function validateGenre(genre) {
  const schema = Joi.object({
    name: Joi.string().min(3).required()
  });

  return schema.validate(genre);
}

module.exports = router;