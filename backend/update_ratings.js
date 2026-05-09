const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("./models/Product");

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("MongoDB Connected for updating ratings.");
    try {
      const products = await Product.find({});
      let updatedCount = 0;
      for (let p of products) {
        let changed = false;
        if (p.rating == null || p.rating === 4.5) { // 4.5 is the new default, maybe we want to randomize it
            p.rating = (3.5 + Math.random() * 1.5).toFixed(1);
            changed = true;
        }
        if (p.reviews == null || p.reviews === 100) {
            p.reviews = Math.floor(Math.random() * 500) + 50;
            changed = true;
        }
        if (changed) {
            await p.save();
            updatedCount++;
        }
      }
      console.log(`${updatedCount} products updated with ratings and reviews.`);
      process.exit(0);
    } catch (err) {
      console.error("Error updating products:", err);
      process.exit(1);
    }
  })
  .catch(err => {
    console.error("Connection Error:", err);
    process.exit(1);
  });
