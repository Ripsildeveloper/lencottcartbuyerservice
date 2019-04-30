'use strict';
var Cart = require('../model/cart.model');

exports.addToCart = function (req, res) {
  Cart.findOne({ userId: req.body.userId }).
    select().exec(function (err, foundCart) {
      if (err) {
        res.status(500).send({
          "result": 0
        });
      } else {
      if (!foundCart) {
          var cart = new Cart();
          cart.userId = req.body.userId;
          cart.items = req.body.items;
          cart.save(function (err, cartDetail) {
            if (err) {
              res.status(500).json(err);
            } else {
              res.status(200).json(cartDetail);
            }
          });
        } else {
          var skuReq = req.body.items;
          var cartDb = foundCart.items;
          var key = "productId";
          skuReq.map(element => {
            if (cartDb.find(s => s[key].toString() === element[key])) {
              const dbSame = cartDb.find(s => s[key].toString() === element[key])
              dbSame.pack += element.pack
            } else {
              foundCart.items.push(element);
            }
          });
          foundCart.save(function (err, cartData) {
            if (err) {
              res.status(500).json(err);
            } else {
              Cart.aggregate([
                { $match: { userId: req.body.userId } },
                { $unwind: "$items" },
                {
                  $lookup:
                  {
                    from: "products",
                    localField: "items.productId",
                    foreignField: "_id",
                    as: "cart_product"
                  }
                }
              ], function (err, cartData) {
                if (err) {
                  res.status(500).send({
                    message: "no cart product"
                  });
                } else {
                  res.status(200).json(cartData);
                }
              });
            }
          });
        } 
        
      }
    });
}

exports.findAllCart = function (req, res) {
  Cart.aggregate([
    { $match: { userId: req.params.userId } },
    { $unwind: "$items" },
    {
      $lookup:
      {
        from: "products",
        localField: "items.productId",
        foreignField: "_id",
        as: "cart_product"
      }
    }
  ], function (err, cartData) {
    if (err) {
      res.status(500).send({
        message: "no cart product"
      });
    } else {
      res.status(200).json(cartData);
    }
  });
}

exports.findCartProductDecrement = function (req, res) {
  Cart.findOne({ userId: req.body.userId }).select().exec(function (err, findProductData) {
    if (err) {
      res.status(500).json(err);
    } else {
      var items = req.body.items; 
      for (var i = 0; i < findProductData.items.length; i++) {
        if (findProductData.items[i].productId.toString() == items.productId) {
          findProductData.items[i].pack = findProductData.items[i].pack - items.pack;
        }
      }
      findProductData.save(function (err, cartProductDetail) {
        if (err) {
          res.status(500).json(err);
        } else {
          Cart.aggregate([
            { $match: { userId: req.body.userId } },
            { $unwind: "$items" },
            {
              $lookup:
              {
                from: "products",
                localField: "items.productId",
                foreignField: "_id",
                as: "cart_product"
              }
            }
          ], function (err, cartData) {
            if (err) {
              res.status(500).send({
                message: "no cart product"
              });
            } else {
              res.status(200).json(cartData);
            }
          });
        }
      });
    }
  });
}


exports.cartProductDelete = function (req, res) {
  Cart.findOne({ userId: req.params.userId },
    function (err, cartData) {
      if (err) {
        res.status(500).send({
          "result": 0
        });
      } else {
        cartData.skuDetail.id(req.params.skuId).remove();
        cartData.save(function (err) {
          if (err) {
            res.status(201).send({
              "result": 0
            });
          } else {
            Cart.aggregate([
              { $match: { userId: req.params.userId } },
              { $unwind: "$items" },
              {
                $lookup:
                {
                  from: "products",
                  localField: "items.productId",
                  foreignField: "_id",
                  as: "cart_product"
                }
              }
            ], function (err, cartData) {
              if (err) {
                res.status(500).send({
                  message: "no cart product"
                });
              } else {
                res.status(200).json(cartData);
              }
            });
          }
        });
      }
    });
}