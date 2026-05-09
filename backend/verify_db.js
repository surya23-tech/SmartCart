const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("./models/Product");

dotenv.config();

mongoose.connect(process.env.MONGO_URI).then(async () => {
    const total = await Product.countDocuments();
    const phones = await Product.find(
        { name: { $in: ["Vivo T3 Pro 5G", "Motorola Edge 50 Fusion", "Realme Narzo 70 Pro"] } },
        { name: 1, image: 1, price: 1, _id: 0 }
    );

    console.log("Total products in MongoDB:", total);
    console.log("\nTarget phones in DB:");
    if (phones.length === 0) {
        console.log("  ❌ NONE FOUND - products are missing from MongoDB!");
    } else {
        phones.forEach(p => console.log(`  ✅ ${p.name} | ₹${p.price} | Image: ${p.image}`));
    }

    process.exit(0);
}).catch(err => {
    console.error("DB Error:", err.message);
    process.exit(1);
});
