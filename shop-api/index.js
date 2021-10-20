const express = require('express');
const cors = require('cors');
const products = require('./app/products');
// const fileDb = require('./fileDb');
const mysqlDb = require('./mysqlDb');

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static('public'));

const port = 8000;

app.use('/products', products);

// fileDb.init();
mysqlDb.connect().catch(e => console.log(e));
app.listen(port, () => {
  console.log(`Server started on ${port} port!`);
});
