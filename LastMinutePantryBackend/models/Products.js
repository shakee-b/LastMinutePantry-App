const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    expiryDate: {
        type: Date,
        required: true
    },
    image: {
        type: String, // Store image URL or file path
        required: false
    }
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
