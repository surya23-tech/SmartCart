const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("./models/Product");

dotenv.config();

const newProducts = [
  {
    name: "Vivo T3 Pro 5G",
    category: "Mobiles",
    price: 24999,
    originalPrice: 26999,
    discount: 2000,
    stock: 50,
    image: "https://m.media-amazon.com/images/I/71YQNAv14GL._SX679_.jpg", // Example placeholder from Amazon
    description: "Vivo T3 Pro 5G with Snapdragon 7 Gen 3, 120Hz 3D Curved AMOLED Display."
  },
  {
    name: "Motorola Edge 50 Fusion",
    category: "Mobiles",
    price: 22999,
    originalPrice: 25999,
    discount: 3000,
    stock: 45,
    image: "https://m.media-amazon.com/images/I/71wF7YDIQkL._SX679_.jpg", // Example placeholder from Amazon
    description: "Motorola Edge 50 Fusion 5G. 144Hz pOLED Curved Display, 50MP Camera."
  },
  {
    name: "Realme Narzo 70 Pro",
    category: "Mobiles",
    price: 19999,
    originalPrice: 21999,
    discount: 2000,
    stock: 60,
    image: "https://m.media-amazon.com/images/I/71V2x53RjKL._SX679_.jpg", // Example placeholder from Amazon
    description: "Realme Narzo 70 Pro 5G. Sony IMX890 OIS Camera, Dimensity 7050."
  }
];

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("MongoDB Connected for inserting new phones.");
    try {
      await Product.insertMany(newProducts);
      console.log(`${newProducts.length} New Products inserted successfully`);
      process.exit(0);
    } catch (err) {
      console.error("Error inserting products:", err);
      process.exit(1);
    }
  })
  .catch(err => {
    console.error("Connection Error:", err);
    process.exit(1);
  });
