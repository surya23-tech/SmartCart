const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("./models/Product");

dotenv.config();

const newPhones = [
    {
        name: "Vivo T3 Pro 5G",
        category: "Mobiles",
        price: 24999,
        originalPrice: 29999,
        discount: 5000,
        rating: 4.4,
        reviews: 1280,
        stock: 50,
        image: "https://m.media-amazon.com/images/I/71YQNAv14GL._SX679_.jpg",
        description: "Vivo T3 Pro 5G with Snapdragon 7 Gen 3 processor, 120Hz 3D Curved AMOLED Display, 50MP AI camera, and 5500mAh battery with 80W FlashCharge."
    },
    {
        name: "Motorola Edge 50 Fusion",
        category: "Mobiles",
        price: 22999,
        originalPrice: 26999,
        discount: 4000,
        rating: 4.3,
        reviews: 942,
        stock: 45,
        image: "https://m.media-amazon.com/images/I/71wF7YDIQkL._SX679_.jpg",
        description: "Motorola Edge 50 Fusion 5G with 144Hz pOLED Curved Display, Snapdragon 7s Gen 2, 50MP OIS Camera, and 68W TurboPower charging."
    },
    {
        name: "Realme Narzo 70 Pro",
        category: "Mobiles",
        price: 19999,
        originalPrice: 23999,
        discount: 4000,
        rating: 4.2,
        reviews: 763,
        stock: 60,
        image: "https://m.media-amazon.com/images/I/71V2x53RjKL._SX679_.jpg",
        description: "Realme Narzo 70 Pro 5G with Sony IMX890 OIS Camera, MediaTek Dimensity 7050, 6.67\" AMOLED 120Hz Display, and 5000mAh battery."
    }
];

async function seedPhones() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB Connected.");

        let insertedCount = 0;
        let skippedCount = 0;

        for (const phone of newPhones) {
            // Check for duplicate by name — safe upsert
            const existing = await Product.findOne({ name: phone.name });
            if (existing) {
                console.log(`⚠️  Skipped (already exists): ${phone.name}`);
                skippedCount++;
            } else {
                await Product.create(phone);
                console.log(`✅ Inserted: ${phone.name}`);
                insertedCount++;
            }
        }

        console.log(`\nDone. Inserted: ${insertedCount} | Skipped (duplicates): ${skippedCount}`);
        process.exit(0);
    } catch (err) {
        console.error("Error:", err.message);
        process.exit(1);
    }
}

seedPhones();
