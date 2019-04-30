var mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    customerId: String,
    orderId: String,
    items: [{productId: mongoose.Schema.Types.ObjectId, pack: Number, 
        ratioQty: Number}],
    total: Number,
    addressDetails: [{
        name: String,
        mobileNumber: Number,
        streetAddress: String,
        building: String,
        landmark: String,
        city: String,
        state: String,
        pincode: String
    }],
    paymentStatus: String,
    orderStatus: String,
    orderDate: Date
});
const Order = mongoose.model('orders', OrderSchema);
module.exports = Order;