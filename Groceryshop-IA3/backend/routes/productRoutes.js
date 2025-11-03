const express = require('express');
const router = express.Router();
const Product = require('../models/productModel');

// GET /api/products
router.get('/', async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

// GET /api/products/:id
router.get('/:id', async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) return res.json(product);
  res.status(404).json({ message: 'Product not found' });
});

module.exports = router;
