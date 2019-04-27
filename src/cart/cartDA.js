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
          cart.skuDetail = req.body.skuDetail;
          cart.save(function (err, cartDetail) {
            if (err) {
              res.status(500).json(err);
            } else {
              res.status(200).json(cartDetail);
            }
          });
        } else {
          var skuReq = req.body.skuDetail;
          var cartDb = foundCart.skuDetail;
          var key = "skuCode";
          skuReq.map(element => {
            if (cartDb.find(s => s[key] === element[key])) {
              const dbSame = cartDb.find(s => s[key] === element[key])
              dbSame.set += element.set
              dbSame.moq = element.moq
            } else {
              foundCart.skuDetail.push(element);
            }
          });
          foundCart.save(function (err, cartDetail) {
            if (err) {
              res.status(500).json(err);
            } else {
              Cart.aggregate([
                { $match: { userId: req.body.userId } },
                { $unwind: "$skuDetail" },
                {
                  $lookup:
                  {
                    from: "products",
                    localField: "skuDetail.productId",
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
    { $unwind: "$skuDetail" },
    {
      $lookup:
      {
        from: "products",
        localField: "skuDetail.productId",
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
      var skuDetail = req.body.skuDetail 
      for (var i = 0; i < findProductData.skuDetail.length; i++) {
        if (findProductData.skuDetail[i].skuCode == skuDetail.skuCode) {
          findProductData.skuDetail[i].set = findProductData.skuDetail[i].set - skuDetail.set;
        }
      }
      findProductData.save(function (err, cartProductDetail) {
        if (err) {
          res.status(500).json(err);
        } else {
          Cart.aggregate([
            { $match: { userId: req.body.userId } },
            { $unwind: "$skuDetail" },
            {
              $lookup:
              {
                from: "products",
                localField: "skuDetail.productId",
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
              { $unwind: "$skuDetail" },
              {
                $lookup:
                {
                  from: "products",
                  localField: "skuDetail.productId",
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