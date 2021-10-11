const express = require('express');
const multer = require('multer');
const path = require('path');
const {nanoid} = require('nanoid');
const config = require('../config');
const fileDb = require('../fileDb');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, config.uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, nanoid() + path.extname(file.originalname));
  }
});

const upload = multer({storage});

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

router.post('/', upload.single('image'), (req, res) => {
  if (!req.body.title || !req.body.price || !req.body.description) {
    return res.status(400).send({error: 'Data not valid'});
  }

  const product = {
    title: req.body.title,
    price: req.body.price,
    description: req.body.description,
  };

  if (req.file) {
    product.image = req.file.filename;
  }

  const newProduct = fileDb.addItem(product);

  res.send(newProduct);
});

module.exports = router; // export default router;