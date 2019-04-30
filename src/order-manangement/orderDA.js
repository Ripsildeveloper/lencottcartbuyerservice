var Order = require('./../model/order.model')
var Product = require('./../model/product.model')

exports.newOrderAdd = function (req, res, orderId) {
  var order = new Order();
  order.customerId = req.body.customerId;
  order.orderId = orderId;
  order.items = req.body.items;
  order.addressDetails = req.body.addressDetails;
  order.paymentStatus = 'SUCCESS';
  order.orderStatus = 'NEW';
  order.orderDate = new Date();
  order.save(function (err, data) {
    if (err) {
      res.status(500).json(err)
    } else {
      res.status(200).json(data)
    }
  });
}

exports.uniqueOrderView = function (req, res) {
  Order.find({
    'customerId': req.params.id
  }).sort({
    orderId: -1
  }).exec(function (err, details) {
    if (err) {
      res.status(500).send({
        message: "Some error occurred while retrieving notes."
      });
    } else {
      res.status(200).json(details);
    }
  });
}