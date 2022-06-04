const express = require('express');
const app = express();
const axios = require('axios');
const bodyParser = require('body-parser');
require('dotenv').config();
app.set("views", __dirname + "/views");
app.set("view engine", "hbs");
app.use(bodyParser.urlencoded({ extended: true }));

/* Routes */
app.get('/', (req, res, next) => {
  res.render('index');
})

app.get('/countries', async (req, res, next) => {
  try {
    const response = await axios.get(`https://restcountries.com/v2/lang/es`)
    res.render('countrylist', { countries: response.data });
  } catch (error) {
    console.log(error)
  }
})

app.get('/countries/:name', async (req, res, next) => {
  const { name } = req.params;
  try {
    const response = await axios.get(`https://restcountries.com/v2/name/${name}`)
    // res.json(response.data)
    res.render('country', response.data[0]);
  } catch (error) {
    console.log(error)
  }
})

app.get('/search', async (req, res, next) => {
  const { country } = req.query;
  try {
    const response = await axios.get(`https://restcountries.com/v2/name/${country.toLowerCase()}`)
    res.render('country', response.data[0]);
  } catch (error) {
    console.log(error);
    res.render('index', { error: `No countries found by ${country}`})
  }
})

app.listen(process.env.PORT, () => console.log(`Connected to port ${process.env.PORT}`));