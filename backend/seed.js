const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("./models/Product");

dotenv.config();

const products = [
  // Mobiles
  {
    name: "iPhone 15 Pro",
    category: "Mobiles",
    price: 134900,
    originalPrice: 134900,
    discount: 0,
    stock: 50,
    image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&q=80&w=800",
    description: "The latest iPhone with titanium design, A17 Pro chip, and a more advanced 48MP Main camera system."
  },
  {
    name: "Samsung Galaxy S24 Ultra",
    category: "Mobiles",
    price: 129999,
    originalPrice: 139999,
    discount: 10000,
    stock: 30,
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&q=80&w=800",
    description: "Welcome to the era of mobile AI. With Galaxy S24 Ultra in your hands, you can unleash whole new levels of creativity."
  },
  {
    name: "Google Pixel 8 Pro",
    category: "Mobiles",
    price: 106999,
    originalPrice: 116999,
    discount: 10000,
    stock: 25,
    image: "https://images.unsplash.com/photo-1598327105666-5b89351cb315?auto=format&fit=crop&q=80&w=800",
    description: "The all-pro phone engineered by Google. It's sleek, powerful, and has Google's best cameras yet."
  },
  {
    name: "OnePlus 12 5G",
    category: "Mobiles",
    price: 64999,
    originalPrice: 69999,
    discount: 5000,
    stock: 60,
    image: "https://images.unsplash.com/photo-1638247025967-b4e38f787b76?auto=format&fit=crop&q=80&w=800",
    description: "Smooth beyond belief. Co-developed with Hasselblad, it delivers flagship-level performance."
  },
  
  // Laptops
  {
    name: "MacBook Pro 16-inch M3 Max",
    category: "Laptops",
    price: 349900,
    originalPrice: 349900,
    discount: 0,
    stock: 15,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=800",
    description: "Mind-blowing. Head-turning. MacBook Pro blasts forward with the M3 Max chip."
  },
  {
    name: "Dell XPS 15",
    category: "Laptops",
    price: 185000,
    originalPrice: 195000,
    discount: 10000,
    stock: 20,
    image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&q=80&w=800",
    description: "The XPS 15 is the perfect balance of power and portability with an immersive OLED display."
  },
  {
    name: "ASUS ROG Zephyrus G14",
    category: "Laptops",
    price: 154990,
    originalPrice: 169990,
    discount: 15000,
    stock: 25,
    image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&q=80&w=800",
    description: "Powerful, ultraportable gaming. Equipped with the latest AMD Ryzen processors and NVIDIA RTX graphics."
  },
  {
    name: "Lenovo ThinkPad X1 Carbon Gen 11",
    category: "Laptops",
    price: 142000,
    originalPrice: 155000,
    discount: 13000,
    stock: 40,
    image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&q=80&w=800",
    description: "Ultralight. Ultrapowerful. The ultimate 14-inch business laptop for professionals."
  },

  // Electronics
  {
    name: "Sony WH-1000XM5 Noise Canceling Headphones",
    category: "Electronics",
    price: 29990,
    originalPrice: 34990,
    discount: 5000,
    stock: 100,
    image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&q=80&w=800",
    description: "Industry-leading noise cancellation and magnificent sound, engineered to perfection."
  },
  {
    name: "iPad Pro 12.9-inch",
    category: "Electronics",
    price: 112900,
    originalPrice: 112900,
    discount: 0,
    stock: 35,
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&q=80&w=800",
    description: "Astonishing performance. Incredibly advanced displays. Superfast wireless connectivity."
  },
  {
    name: "Samsung 55-inch 4K Smart OLED TV",
    category: "Electronics",
    price: 124990,
    originalPrice: 154990,
    discount: 30000,
    stock: 10,
    image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&q=80&w=800",
    description: "Experience deep blacks, clean whites, and lively colors driven by Quantum Dot technology."
  },
  {
    name: "Canon EOS R6 Mark II Mirrorless Camera",
    category: "Electronics",
    price: 214990,
    originalPrice: 224990,
    discount: 10000,
    stock: 12,
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=800",
    description: "Capture the decisive moment with high-speed shooting and advanced autofocus."
  },

  // Grocery
  {
    name: "Organic Honey 1KG",
    category: "Grocery",
    price: 850,
    originalPrice: 999,
    discount: 149,
    stock: 200,
    image: "https://images.unsplash.com/photo-1587049352847-4d4b137a4d53?auto=format&fit=crop&q=80&w=800",
    description: "100% pure, raw, and unfiltered organic honey sourced from pristine forests."
  },
  {
    name: "Premium California Almonds 500g",
    category: "Grocery",
    price: 499,
    originalPrice: 650,
    discount: 151,
    stock: 300,
    image: "https://images.unsplash.com/photo-1508061253366-f7da158b6d46?auto=format&fit=crop&q=80&w=800",
    description: "Crunchy, delicious, and highly nutritious premium quality almonds."
  },
  {
    name: "Extra Virgin Olive Oil 1L",
    category: "Grocery",
    price: 1250,
    originalPrice: 1400,
    discount: 150,
    stock: 150,
    image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&q=80&w=800",
    description: "Cold-pressed extra virgin olive oil perfect for salads and cooking."
  },
  {
    name: "Assorted Green Tea Box",
    category: "Grocery",
    price: 350,
    originalPrice: 400,
    discount: 50,
    stock: 250,
    image: "https://images.unsplash.com/photo-1576092762791-dd9e2220abd1?auto=format&fit=crop&q=80&w=800",
    description: "A premium collection of organic green tea bags for detox and relaxation."
  },

  // Fashion
  {
    name: "Men's Classic White Shirt",
    category: "Fashion",
    price: 1299,
    originalPrice: 1999,
    discount: 700,
    stock: 80,
    image: "https://images.unsplash.com/photo-1596755094514-f87e32f85e2c?auto=format&fit=crop&q=80&w=800",
    description: "A versatile, slim-fit white cotton shirt perfect for formal and casual occasions."
  },
  {
    name: "Women's Floral Summer Dress",
    category: "Fashion",
    price: 1899,
    originalPrice: 2499,
    discount: 600,
    stock: 65,
    image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&q=80&w=800",
    description: "Lightweight, breathable floral dress perfect for warm sunny days."
  },
  {
    name: "Men's Slim Fit Denim Jeans",
    category: "Fashion",
    price: 1599,
    originalPrice: 2299,
    discount: 700,
    stock: 120,
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&q=80&w=800",
    description: "Classic blue denim with a comfortable stretch and slim fit."
  },
  {
    name: "Women's Leather Handbag",
    category: "Fashion",
    price: 3499,
    originalPrice: 4999,
    discount: 1500,
    stock: 45,
    image: "https://images.unsplash.com/photo-1584916201218-f4242ceb4809?auto=format&fit=crop&q=80&w=800",
    description: "Elegant and spacious genuine leather tote bag for everyday luxury."
  },

  // Shoes
  {
    name: "Nike Air Force 1 '07",
    category: "Shoes",
    price: 7495,
    originalPrice: 7495,
    discount: 0,
    stock: 85,
    image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=800",
    description: "The radiance lives on in the Nike Air Force 1 '07, the b-ball icon."
  },
  {
    name: "Adidas Ultraboost 22",
    category: "Shoes",
    price: 11999,
    originalPrice: 17999,
    discount: 6000,
    stock: 55,
    image: "https://images.unsplash.com/photo-1518002171953-a080ee817e1f?auto=format&fit=crop&q=80&w=800",
    description: "Running shoes delivering supreme energy return and comfort with every step."
  },
  {
    name: "Puma Suede Classic",
    category: "Shoes",
    price: 3599,
    originalPrice: 5999,
    discount: 2400,
    stock: 90,
    image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&q=80&w=800",
    description: "Definitive classic sneakers that have been iconic since the 1980s."
  },
  {
    name: "Timberland Classic 6-Inch Boot",
    category: "Shoes",
    price: 12999,
    originalPrice: 14999,
    discount: 2000,
    stock: 40,
    image: "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?auto=format&fit=crop&q=80&w=800",
    description: "The original waterproof boot designed for rugged durability and timeless style."
  },

  // Watches
  {
    name: "Apple Watch Series 9",
    category: "Watches",
    price: 41900,
    originalPrice: 41900,
    discount: 0,
    stock: 75,
    image: "https://images.unsplash.com/photo-1434493789847-2902a524c59c?auto=format&fit=crop&q=80&w=800",
    description: "Smarter. Brighter. Mightier. The ultimate device for a healthy life."
  },
  {
    name: "Rolex Submariner Date",
    category: "Watches",
    price: 850000,
    originalPrice: 850000,
    discount: 0,
    stock: 2,
    image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&q=80&w=800",
    description: "The ultimate reference chosen by professionals with a timeless design."
  },
  {
    name: "Casio G-Shock Mudmaster",
    category: "Watches",
    price: 24995,
    originalPrice: 28995,
    discount: 4000,
    stock: 45,
    image: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&q=80&w=800",
    description: "Built to withstand the toughest environments with mud-resistant construction."
  },
  {
    name: "Fossil Gen 6 Smartwatch",
    category: "Watches",
    price: 18495,
    originalPrice: 23995,
    discount: 5500,
    stock: 60,
    image: "https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?auto=format&fit=crop&q=80&w=800",
    description: "A fast, stylish smartwatch powered with Wear OS by Google."
  },

  // Accessories
  {
    name: "Ray-Ban Aviator Classic",
    category: "Accessories",
    price: 7590,
    originalPrice: 8590,
    discount: 1000,
    stock: 110,
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&q=80&w=800",
    description: "Currently one of the most iconic sunglass models in the world."
  },
  {
    name: "Samsonite Winfield 3 Hardside Luggage",
    category: "Accessories",
    price: 14500,
    originalPrice: 18500,
    discount: 4000,
    stock: 30,
    image: "https://images.unsplash.com/photo-1553531384-cc64ac80f931?auto=format&fit=crop&q=80&w=800",
    description: "Durable, lightweight polycarbonate spinner luggage for modern travel."
  },
  {
    name: "Genuine Leather Wallet",
    category: "Accessories",
    price: 1299,
    originalPrice: 1999,
    discount: 700,
    stock: 150,
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&q=80&w=800",
    description: "Minimalist bifold leather wallet featuring RFID blocking."
  },
  {
    name: "Anker PowerCore 20000mAh Power Bank",
    category: "Accessories",
    price: 3499,
    originalPrice: 4999,
    discount: 1500,
    stock: 200,
    image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?auto=format&fit=crop&q=80&w=800",
    description: "Ultra-high capacity portable charger with fast charging technology."
  },

  // Recently Added Smartphones
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
  },
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

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("MongoDB Connected for Seeding");
    try {
      await Product.deleteMany({});
      console.log("Existing products removed");
      await Product.insertMany(products);
      console.log(`${products.length} Products inserted successfully`);
      process.exit(0);
    } catch (err) {
      console.error(err);
      process.exit(1);
    }
  })
  .catch(err => {
    console.error("Connection Error:", err);
    process.exit(1);
  });
