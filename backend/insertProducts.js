const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("./models/Product");

dotenv.config();

const newProducts = [
    {
        name: "Vivo T3 Pro 5G",
        category: "Mobiles",
        price: 24999,
        originalPrice: 29999,
        discount: 5000,
        rating: 4.4,
        reviews: 1280,
        stock: 50,
        image: "https://rukminim2.flixcart.com/image/528/528/xif0q/mobile/t/e/3/-original-imaghx5yhhhhfzpx.jpeg",
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
        image: "https://rukminim2.flixcart.com/image/528/528/xif0q/mobile/8/b/y/-original-imagh3ghyy7hg8ge.jpeg",
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
        image: "https://rukminim2.flixcart.com/image/528/528/xif0q/mobile/1/p/d/-original-imagtg9h6gh3zfgg.jpeg",
        description: "Realme Narzo 70 Pro 5G with Sony IMX890 OIS Camera, MediaTek Dimensity 7050, 6.67\" AMOLED 120Hz Display, and 5000mAh battery."
    },
    {
        name: "OnePlus 12",
        category: "Mobiles",
        price: 39999,
        originalPrice: 49999,
        discount: 10000,
        rating: 4.6,
        reviews: 2150,
        stock: 35,
        image: "https://rukminim2.flixcart.com/image/528/528/xif0q/mobile/f/p/q/-original-imah3pv2gcgkfyxb.jpeg",
        description: "OnePlus 12 with Snapdragon 8 Gen 3 processor, 6.82\" 120Hz AMOLED Display, 50MP Hasselblad camera, 100W SuperVOOC charging, and 5400mAh battery."
    },
    {
        name: "Samsung Galaxy A15",
        category: "Mobiles",
        price: 14999,
        originalPrice: 18999,
        discount: 4000,
        rating: 4.1,
        reviews: 1850,
        stock: 70,
        image: "https://rukminim2.flixcart.com/image/528/528/xif0q/mobile/u/q/x/-original-imagy2fjkgd8jnzc.jpeg",
        description: "Samsung Galaxy A15 with MediaTek Dimensity 6100+, 6.5\" FHD+ Display, 50MP main camera, 5000mAh battery, and 25W fast charging."
    },
    {
        name: "Apple iPhone 15",
        category: "Mobiles",
        price: 79999,
        originalPrice: 99999,
        discount: 20000,
        rating: 4.7,
        reviews: 3200,
        stock: 25,
        image: "https://rukminim2.flixcart.com/image/528/528/xif0q/mobile/j/7/3/-original-imagz6qzhtrzg8hw.jpeg",
        description: "Apple iPhone 15 with A17 Pro chip, 6.1\" Super Retina XDR Display, Advanced Dual Camera System, and all-day battery life."
    }
];

async function insertProducts() {
    try {
        console.log("\n📍 Connecting to MongoDB Atlas...");
        await mongoose.connect(process.env.MONGO_URI);
        console.log("✅ Connected to MongoDB successfully");

        // Count BEFORE
        const countBefore = await Product.countDocuments();
        console.log(`\n📊 Current products in database: ${countBefore}`);

        // Clear old versions of these 3 products
        const productNames = newProducts.map(p => p.name);
        const deleted = await Product.deleteMany({ name: { $in: productNames } });
        console.log(`🗑️  Removed duplicate entries: ${deleted.deletedCount}`);

        // Insert using insertMany()
        const inserted = await Product.insertMany(newProducts);
        console.log(`\n✅ Products inserted successfully:`);
        
        inserted.forEach(product => {
            console.log(`   ✓ ${product.name} | ID: ${product._id} | Price: ₹${product.price}`);
        });

        // Count AFTER
        const countAfter = await Product.countDocuments();
        console.log(`\n📊 Total products in database now: ${countAfter}`);

        console.log("\n✨ Insertion complete! Products are now permanently stored in MongoDB Atlas.");
        console.log("📱 Open MongoDB Compass and navigate to: smartcart → products collection");

        await mongoose.disconnect();
        process.exit(0);
    } catch (error) {
        console.error("❌ Error inserting products:", error.message);
        process.exit(1);
    }
}

insertProducts();
