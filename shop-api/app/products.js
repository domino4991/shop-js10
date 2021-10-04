const express = require('express');
const fileDb = require('../fileDb');
const router = express.Router();

router.get('/', (req, res) => {
  const products = fileDb.getItems();
  res.send(products);
});

router.get('/:id', (req, res) => {
  const product = fileDb.getItem(req.params.id);
  if (!product) {
    return res.status(404).send({error: 'Product not found'});
  }

  res.send(product);
});

router.post('/', (req, res) => {
  if (!req.body.title || !req.body.price || !req.body.description) {
    return res.status(400).send({error: 'Data not valid'});
  }

  const newProduct = fileDb.addItem({
    title: req.body.title,
    price: req.body.price,
    description: req.body.description,
  });

  res.send(newProduct);
});

module.exports = router; // export default router;