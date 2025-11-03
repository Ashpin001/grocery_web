const express = require('express');
const router = express.Router();
const Order = require('../models/orderModel');
const Product = require('../models/productModel');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

function auth(req, res, next) {
  const header = req.headers.authorization;
  if (!header) return res.status(401).json({ message: 'No token' });
  const token = header.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
}

// POST /api/orders
router.post('/', auth, async (req, res) => {
  const { orderItems, totalPrice, shippingAddress } = req.body;
  if (!orderItems || !orderItems.length) return res.status(400).json({ message: 'No order items' });
  console.log('[orders] incoming orderItems:', JSON.stringify(orderItems));

  // Normalize orderItems.product to ObjectId. Support legacy clients that send product names.
  const normalizedItems = [];
  for (const it of orderItems) {
    let prodVal = it.product;
    console.log('[orders] processing product identifier:', prodVal);
    // if already an ObjectId-like string or ObjectId, accept it
    if (mongoose.Types.ObjectId.isValid(prodVal)) {
      console.log('[orders] product identifier is a valid ObjectId:', prodVal);
      normalizedItems.push({ ...it, product: mongoose.Types.ObjectId(prodVal) });
      continue;
    }

    // if product is a string (name or legacy id), try to look up the product
    if (typeof prodVal === 'string') {
      // try exact name match first
      let found = await Product.findOne({ name: prodVal });
      if (!found) {
        // try case-insensitive substring match (handles 'apple' -> 'Apple (1kg)')
        const escapeRegex = (s) => s.replace(/[.*+?^${}()|[\\]\\]/g, '\\$&');
        const re = new RegExp(escapeRegex(prodVal), 'i');
        found = await Product.findOne({ name: re });
      }
      console.log('[orders] product lookup result for', prodVal, ':', found ? found._id : null);
      if (found) {
        normalizedItems.push({ ...it, product: found._id });
        continue;
      } else {
        return res.status(400).json({ message: `Product not found: ${prodVal}` });
      }
    }

    // unsupported product identifier
    return res.status(400).json({ message: 'Invalid product identifier in orderItems' });
  }

  const order = await Order.create({ user: req.user.id, orderItems: normalizedItems, totalPrice, shippingAddress });
  res.status(201).json(order);
});

// GET /api/orders/my
router.get('/my', auth, async (req, res) => {
  const orders = await Order.find({ user: req.user.id }).populate('orderItems.product');
  res.json(orders);
});

module.exports = router;
