var mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    userId: String,
    skuDetail: [{productId: String, pack: Number} ],
  });

  const Cart = mongoose.model('cart', cartSchema);
  module.exports = Cart;
