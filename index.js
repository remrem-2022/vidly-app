//external modules
const express = require('express');
const Joi = require('joi');

//routes variables
const home = require('./routes/home');
const genres = require('./routes/genres');

//app
const app = express();

//middle ware
app.use(express.static('public'));


//set view
app.set('view engine', 'pug');
app.set('views', './views')

//home
app.use('/', home);
//genre
app.use('/api/genres', genres)

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening to ${port}`);
})