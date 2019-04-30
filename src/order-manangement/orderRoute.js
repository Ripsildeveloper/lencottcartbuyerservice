'use strict';
var orderMgr = require('./orderMgr');

module.exports = function (app) {
    
    app.route('/order')
        .put(orderMgr.newOrderAdd);
    app.route('/orderview/:id')
        .get(orderMgr.uniqueOrderView);
}
