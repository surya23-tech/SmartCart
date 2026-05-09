const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("./models/Product");

dotenv.config();

const phones = [
    {
        name: "Vivo T3 Pro 5G",
        category: "Mobiles",
        price: 24999,
        originalPrice: 29999,
        discount: 5000,
        stock: 50,
        rating: 4.4,
        reviews: 1280,
        image: "https://rukminim2.flixcart.com/image/528/528/xif0q/mobile/t/e/3/-original-imaghx5yhhhhfzpx.jpeg",
        description: "Vivo T3 Pro 5G with Snapdragon 7 Gen 3, 120Hz 3D Curved AMOLED Display, 50MP AI triple camera, and 5500mAh battery with 80W FlashCharge."
    },
    {
        name: "Motorola Edge 50 Fusion",
        category: "Mobiles",
        price: 22999,
        originalPrice: 26999,
        discount: 4000,
        stock: 45,
        rating: 4.3,
        reviews: 942,
        image: "https://rukminim2.flixcart.com/image/528/528/xif0q/mobile/8/b/y/-original-imagh3ghyy7hg8ge.jpeg",
        description: "Motorola Edge 50 Fusion 5G with 144Hz pOLED Curved Display, Snapdragon 7s Gen 2, 50MP OIS Camera, and 68W TurboPower fast charging."
    },
    {
        name: "Realme Narzo 70 Pro",
        category: "Mobiles",
        price: 19999,
        originalPrice: 23999,
        discount: 4000,
        stock: 60,
        rating: 4.2,
        reviews: 763,
        image: "https://rukminim2.flixcart.com/image/528/528/xif0q/mobile/1/p/d/-original-imagtg9h6gh3zfgg.jpeg",
        description: "Realme Narzo 70 Pro 5G with Sony IMX890 OIS Camera, Dimensity 7050, 6.67\" AMOLED 120Hz Display, 5000mAh battery."
    }
];

async function insertPhones() {
    try {
        console.log("\n🔌 Connecting to MongoDB Atlas...");
        await mongoose.connect(process.env.MONGO_URI);

        // Show which DB we connected to
        const dbName = mongoose.connection.db.databaseName;
        const host = mongoose.connection.host;
        console.log(`✅ Connected to Atlas Host: ${host}`);
        console.log(`📦 Database: ${dbName}`);
        console.log(`📂 Collection: products\n`);

        // Count BEFORE
        const countBefore = await Product.countDocuments();
        console.log(`📊 Products in DB before: ${countBefore}`);

        // Delete old versions of these 3 phones only
        const names = phones.map(p => p.name);
        const deleted = await Product.deleteMany({ name: { $in: names } });
        console.log(`🗑️  Deleted old entries: ${deleted.deletedCount}`);

        // Insert fresh
        const inserted = await Product.insertMany(phones);
        console.log(`\n✅ Products inserted successfully:`);
        inserted.forEach(p => {
            console.log(`   • ${p.name} | _id: ${p._id} | ₹${p.price}`);
        });

        // Count AFTER
        const countAfter = await Product.countDocuments();
        console.log(`\n📊 Products in DB after: ${countAfter}`);
        console.log(`\n🎉 Done! Open MongoDB Compass → cluster0.qryzcti.mongodb.net → ${dbName} → products`);
        console.log(`   Then click the REFRESH button (↺) to see the new documents.\n`);

        process.exit(0);
    } catch (err) {
        console.error("❌ Error:", err.message);
        process.exit(1);
    }
}

insertPhones();
