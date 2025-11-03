const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  orderItems: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
      name: String,
      qty: Number,
      price: Number
    }
  ],
  totalPrice: { type: Number, required: true },
  shippingAddress: {
    name: String,
    street: String,
    city: String,
    postalCode: String,
    phone: String
  }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
