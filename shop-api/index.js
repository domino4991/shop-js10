const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const products = require('./app/products');
const fileDb = require('./fileDb');

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('public'));

const port = 8000;

app.use('/products', products);

fileDb.init();
app.listen(port, () => {
  console.log(`Server started on ${port} port!`);
});