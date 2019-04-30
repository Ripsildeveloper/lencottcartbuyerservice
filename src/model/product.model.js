var mongoose = require('mongoose');
var Size = require('./size.model');

const ProductSchema = new mongoose.Schema({
    productId: String,
    productTitle: String,
    productName: String,
    productDescription: String,
    overview: String,
    price: Number,
    color: String,
    productImageName: [String],
    subCategory: String,
    bulletPoints: String,
    mfdQty: Number,
    // details
    styleCode: String,
    material: String,
    weight: String,
    height: String,
    occassion: String,
    mrp: Number,
    sp: Number,
    //size
    supCategoryId: String,
    mainCategoryId: String,
    subCategoryId: String,
    size: [Size]
});




const Product = mongoose.model('product', ProductSchema);
module.exports = Product;
