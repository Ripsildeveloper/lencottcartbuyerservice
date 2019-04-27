var mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    customerId: String,
    orderId: String,
    products: [{skuCode: String , set: Number, moq: Number, productId: mongoose.Schema.Types.ObjectId}],
    total: String,
    addressDetails: [{
        name: String,
        mobileNumber: Number,
        streetAddress: String,
        building: String,
        landmark: String,
        city: String,
        state: String,
        pincode: String,
    }],
    paymentStatus: String,
    orderStatus: String,
    orderDate: Date
});
const Order = mongoose.model('orders', OrderSchema);
module.exports = Order;