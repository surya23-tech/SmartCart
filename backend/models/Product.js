const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    originalPrice: {
        type: Number,
        required: true
    },
    discount: {
        type: Number,
        default: 0
    },
    category: {
        type: String,
        required: true
    },
    stock: {
        type: Number,
        default: 10
    },
    rating: {
        type: Number,
        default: 4.5
    },
    reviews: {
        type: Number,
        default: 100
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Product", productSchema);