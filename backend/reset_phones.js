const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("./models/Product");

dotenv.config();

const phoneNames = ["Vivo T3 Pro 5G", "Motorola Edge 50 Fusion", "Realme Narzo 70 Pro"];

const updatedPhones = [
    {
        name: "Vivo T3 Pro 5G",
        category: "Mobiles",
        price: 24999,
        originalPrice: 29999,
        discount: 5000,
        rating: 4.4,
        reviews: 1280,
        stock: 50,
        // Vivo T3 Pro 5G — Flipkart CDN (stable)
        image: "https://rukminim2.flixcart.com/image/528/528/xif0q/mobile/t/e/3/-original-imaghx5yhhhhfzpx.jpeg",
        description: "Vivo T3 Pro 5G with Snapdragon 7 Gen 3, 120Hz 3D Curved AMOLED Display, 50MP AI triple camera, and 5500mAh battery with 80W FlashCharge."
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
        // Motorola Edge 50 Fusion — Flipkart CDN (stable)
        image: "https://rukminim2.flixcart.com/image/528/528/xif0q/mobile/8/b/y/-original-imagh3ghyy7hg8ge.jpeg",
        description: "Motorola Edge 50 Fusion 5G with 144Hz pOLED Curved Display, Snapdragon 7s Gen 2, 50MP OIS Camera, and 68W TurboPower fast charging."
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
        // Realme Narzo 70 Pro — Flipkart CDN (stable)
        image: "https://rukminim2.flixcart.com/image/528/528/xif0q/mobile/1/p/d/-original-imagtg9h6gh3zfgg.jpeg",
        description: "Realme Narzo 70 Pro 5G with Sony IMX890 OIS Camera, Dimensity 7050, 6.67\" AMOLED 120Hz Display, 5000mAh battery."
    }
];

async function resetPhones() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB Connected.\n");

        // Step 1: Delete only these 3 phones by name — all other products are untouched
        const deleteResult = await Product.deleteMany({ name: { $in: phoneNames } });
        console.log(`🗑️  Deleted ${deleteResult.deletedCount} existing product(s).`);

        // Step 2: Re-insert with correct images
        for (const phone of updatedPhones) {
            await Product.create(phone);
            console.log(`✅ Inserted: ${phone.name}`);
        }

        console.log(`\n✔ Done. All 3 phones re-added with proper images. Other products unchanged.`);
        process.exit(0);
    } catch (err) {
        console.error("Error:", err.message);
        process.exit(1);
    }
}

resetPhones();
