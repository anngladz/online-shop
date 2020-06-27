const express = require('express');
const router = express.Router();

const Product = require('../models/product.model');
const Order = require('../models/order.model');

router.get('/products', async (req, res) => {
  try {
    const result = await Product.find();
    if(!result) res.status(404).json({ post: 'Not found' });
    else res.json(result);
  }
  catch(err) {
    res.status(500).json(err);
  }
});

router.get('/products/:id', async (req, res) => {
  try {
    const result = await Product
      .findById(req.params.id);
    if(!result) res.status(404).json({ post: 'Not found' });
    else res.json(result);
  }
  catch(err) {
    res.status(500).json(err);
  }
});

router.post('/orders/add', async (req, res) => {
  try {
    const {
      fname,
      lname,
      address,
      city,
      email,
      phone,
      comment,
      cart,
      price
    } = req.body;

    const emailValidate = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (emailValidate.test(email) && fname.length >= 2 && lname.length >= 2) {
      const newOrder = new Order({
        fname: fname,
        lname: lname,
        address: address,
        city: city,
        email: email,
        phone: phone,
        comment: comment,
        cart: cart,
        price: price
      });
      await newOrder.save();
      res.json({
        message: 'OK',
      });
    } else {
      throw new Error('Wrong input!');
    }
  } catch (err) {
    res.status(500).json({
      message: err,
    });
  }
});

module.exports = router;
