'use strict';
var cartMgr = require('./cartMgr');


module.exports = function (app) {
    app.route('/cart')
        .post(cartMgr.addToCart);
    app.route('/findcart/:userId')
        .get(cartMgr.findAllCart);
    app.route('/findcartproduct')
        .post(cartMgr.findCartProductDecrement);
    app.route('/deletecart/:userId/skuid/:skuId')
        .delete(cartMgr.cartProductDelete);

}
