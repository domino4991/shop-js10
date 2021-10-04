const express = require('express');
const bodyParser = require('body-parser');
const products = require('./app/products');
const fileDb = require('./fileDb');

const app = express();
app.use(bodyParser.json());

const port = 8000;

app.use('/products', products);

fileDb.init();
app.listen(port, () => {
  console.log(`Server started on ${port} port!`);
});