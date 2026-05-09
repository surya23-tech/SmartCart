const express = require("express");

const router = express.Router();

const Product = require("../models/Product");


// ADD PRODUCT


// Add a new product
router.post("/", async (req, res) => {
    try {
        const { name, category, price, originalPrice, discount, stock, rating, reviews, image, description } = req.body;
        const product = new Product({
            name,
            category,
            price,
            originalPrice,
            discount,
            stock,
            rating,
            reviews,
            image,
            description
        });
        await product.save();
        res.status(201).json({ message: "Product added successfully", product });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Bulk insert sample products
router.post("/bulk-insert", async (req, res) => {
    try {
        const sampleProducts = [
            // Mobiles
            {
                name: "iPhone 15 Pro",
                category: "Mobiles",
                price: 129999,
                originalPrice: 139999,
                discount: 10000,
                stock: 20,
                image: "https://m.media-amazon.com/images/I/81SigpJN1KL._SX679_.jpg",
                description: "Apple iPhone 15 Pro (256GB) - Natural Titanium"
            },
            {
                name: "Samsung Galaxy S24 Ultra",
                category: "Mobiles",
                price: 119999,
                originalPrice: 129999,
                discount: 10000,
                stock: 15,
                image: "https://m.media-amazon.com/images/I/71qZc0p8VwL._SX679_.jpg",
                description: "Samsung Galaxy S24 Ultra 5G (Titanium Gray, 12GB, 256GB Storage)"
            },
            // Electronics
            {
                name: "Sony WH-1000XM5 Headphones",
                category: "Electronics",
                price: 29999,
                originalPrice: 34999,
                discount: 5000,
                stock: 30,
                image: "https://m.media-amazon.com/images/I/61bK6PMOC3L._SX679_.jpg",
                description: "Sony WH-1000XM5 Wireless Industry Leading Noise Cancelling Headphones"
            },
            {
                name: "boAt Airdopes 141",
                category: "Electronics",
                price: 1299,
                originalPrice: 4490,
                discount: 3191,
                stock: 100,
                image: "https://m.media-amazon.com/images/I/61KNJav3S9L._SX679_.jpg",
                description: "boAt Airdopes 141 Bluetooth TWS Earbuds"
            },
            // Grocery
            {
                name: "Aashirvaad Atta 10kg",
                category: "Grocery",
                price: 499,
                originalPrice: 600,
                discount: 101,
                stock: 50,
                image: "https://m.media-amazon.com/images/I/81Qp+6p6nGL._SX679_.jpg",
                description: "Aashirvaad Superior MP Atta, 10kg"
            },
            {
                name: "Tata Salt 1kg",
                category: "Grocery",
                price: 28,
                originalPrice: 35,
                discount: 7,
                stock: 200,
                image: "https://m.media-amazon.com/images/I/71pW4lHkJkL._SX679_.jpg",
                description: "Tata Salt, Vacuum Evaporated Iodised, 1kg"
            },
            // Fashion
            {
                name: "Levi's Men's Jeans",
                category: "Fashion",
                price: 1999,
                originalPrice: 3999,
                discount: 2000,
                stock: 40,
                image: "https://m.media-amazon.com/images/I/81Qd4N1p+VL._SY679_.jpg",
                description: "Levi's Men's Slim Jeans"
            },
            {
                name: "Nike Revolution 6 Shoes",
                category: "Fashion",
                price: 3499,
                originalPrice: 4995,
                discount: 1496,
                stock: 25,
                image: "https://m.media-amazon.com/images/I/71p6lQG+QbL._SY695_.jpg",
                description: "Nike Revolution 6 NN Men's Road Running Shoes"
            }
        ];
        await Product.insertMany(sampleProducts);
        res.status(201).json({ message: "Sample products inserted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// GET PRODUCTS

router.get("/", async (req, res) => {

    try {

        const products = await Product.find();

        res.status(200).json(products);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
});


module.exports = router;