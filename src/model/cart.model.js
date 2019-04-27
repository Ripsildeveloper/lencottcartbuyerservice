var mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    userId: String,
    skuDetail: [{skuCode: String , set: Number, moq: Number, productId: mongoose.Schema.Types.ObjectId}],
  });

  const Cart = mongoose.model('cart', cartSchema);
  module.exports = Cart;
