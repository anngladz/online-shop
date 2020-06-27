const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  fname: { type: String, required: true },
  lname: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  comment: { type: String },
  cart: { type: Array, required: true },
  price: { type: Number, required: true }
});

module.exports = mongoose.model('Order', orderSchema);
