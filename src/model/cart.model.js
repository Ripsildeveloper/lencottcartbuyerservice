var mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    userId: String,
    items: [{productId: mongoose.Schema.Types.ObjectId, pack: Number} ],
  });

  const Cart = mongoose.model('cart', cartSchema);
  module.exports = Cart;
