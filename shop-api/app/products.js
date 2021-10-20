const express = require('express');
const multer = require('multer');
const path = require('path');
const {nanoid} = require('nanoid');
const config = require('../config');
// const fileDb = require('../fileDb');
const mysqlDb = require('../mysqlDb');

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

router.get('/', async (req, res) => {
  const [products] = await mysqlDb.getConnection().query('SELECT * FROM ??', ['products']);
  res.send(products);
});

router.get('/:id', async (req, res) => {
  const [product] = await mysqlDb.getConnection().query(
		`SELECT * FROM ?? where id = ?`,
	  ['products', req.params.id])
  if (!product) {
    return res.status(404).send({error: 'Product not found'});
  }

  res.send(product[0]);
});

router.post('/', upload.single('image'), async (req, res) => {
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

  const newProduct = await mysqlDb.getConnection().query(
		'INSERT INTO ?? (title, price, description, image) values (?, ?, ?, ?)',
	  ['products', product.title, product.price, product.description, product.image]
  );

  res.send({
	  ...product,
	  id: newProduct.insertId
  });
});

router.put('/:id', upload.single('image'), async (req, res) => {
	const product = {
		title: req.body.title,
		price: req.body.price,
		description: req.body.description,
	};
	
	if(req.file) product.image = req.file.filename;
	
	await mysqlDb.getConnection().query(
		'UPDATE ?? SET ? where id = ?',
		['products', {...product}, req.params.id]);
	
	res.send({message: `Update successful, id= ${req.params.id}`});
});

module.exports = router; // export default router;
