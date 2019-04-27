var Order = require('./../model/order.model')
var Product = require('./../model/product.model')

exports.newOrderAdd = function (req, res, orderId) {
   /*  var skuDetails = req.body.products;
    var idArray = [];
    for (var i = 0; i < skuDetails.length; i++) {
        idArray.push(skuDetails[i].skuCode);
    }
      
      
      console.log(idArray);
      Product.find({
          'size.skuCode': { $in: idArray}
        }, function (err, inventoryUpdate) {
          if (err) {
            res.status(500).send({
              "result": 0
            });
          } else {
            
              
            res.status(200).json(inventoryUpdate);
          }
        });
     Product.find({'size.skuCode': { $in: idArray}}, {_id:0, size: 1}, function(err, inventoryUpdate){
       if (err) {
           res.status(500).send({
             "result": 0
           });
         } else { 
           inventoryUpdate.map(element => {
               element.size.forEach(test => {
                   console.log(test);
               })
           });
         }
     });

   for (let n of skuDetails) {
            Product.findOneAndUpdate({
                _id: '5cbff6ba98d716238cd30fa6', 'size.skuCode': 'CP19031', 
              }, {
                  $inc: { 'size.$.sizeQty': 1 }
                }, function(err, doc) {
                    if (err) console.log(err);
                    console.log(doc)
                });
    } 

 */
}

