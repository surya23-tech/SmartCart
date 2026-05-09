const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("./models/Product");

dotenv.config();

const newItems = [
    {
        name: "Sony PlayStation 5 Slim Console",
        category: "Electronics",
        price: 44990,
        originalPrice: 54990,
        discount: 10000,
        stock: 15,
        rating: 4.8,
        reviews: 2450,
        image: "https://m.media-amazon.com/images/I/419+9VnLqSL._SX679_.jpg",
        description: "Experience lightning-fast loading with an ultra-high speed SSD, deeper immersion with support for haptic feedback, adaptive triggers, and 3D Audio."
    },
    {
        name: "Nike Heritage Backpack",
        category: "Accessories",
        price: 1895,
        originalPrice: 2495,
        discount: 600,
        stock: 40,
        rating: 4.5,
        reviews: 1120,
        image: "https://m.media-amazon.com/images/I/719h9U6y+NL._SX679_.jpg",
        description: "The Nike Heritage Backpack combines simplicity and functionality with its clean design and padded shoulder straps for comfort."
    }
];

async function addProducts() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB Atlas.");

        for (const item of newItems) {
            const exists = await Product.findOne({ name: item.name });
            if (!exists) {
                await Product.create(item);
                console.log(`✅ Added: ${item.name}`);
            } else {
                console.log(`⚠️  Skipped (already exists): ${item.name}`);
            }
        }

        const total = await Product.countDocuments();
        console.log(`Total products now: ${total}`);
        process.exit(0);
    } catch (err) {
        console.error("Error:", err.message);
        process.exit(1);
    }
}

addProducts();
