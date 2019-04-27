
var cartDA = require('./cartDA')

exports.addToCart = function (req, res) {
    try {
        cartDA.addToCart(req, res);
    } catch (error) {
        console.log(error);
    }
}

exports.findAllCart = function (req, res) {
    try {
        cartDA.findAllCart(req, res);
    } catch (error) {
        console.log(error);
    }
}

exports.findCartProductDecrement = function (req, res) {
    try {
        cartDA.findCartProductDecrement(req, res);
    } catch (error) {
        console.log(error);
    }
}


exports.cartProductDelete = function (req, res) {
    try {
        cartDA.cartProductDelete(req, res);
    } catch (error) {
        console.log(error);
    }
}
