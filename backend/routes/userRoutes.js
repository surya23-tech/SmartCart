const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User");

// ========================
// POST /api/users/register
// ========================
router.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: "Name, email and password are required" });
        }

        const existing = await User.findOne({ email });
        if (existing) {
            return res.status(409).json({ message: "User already exists with this email" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ name, email, password: hashedPassword, cart: [] });
        await user.save();

        res.status(201).json({ message: "User registered successfully", email });
    } catch (error) {
        console.error("Register Error:", error);
        res.status(500).json({ message: "Server Error" });
    }
});

// ========================
// POST /api/users/login
// ========================
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        res.json({
            message: "Login successful",
            email: user.email,
            name: user.name
        });
    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ message: "Server Error" });
    }
});

// ========================
// GET /api/users/profile/:email
// ========================
router.get("/profile/:email", async (req, res) => {
    try {
        const user = await User.findOne({ email: req.params.email });
        if (!user) return res.status(404).json({ message: "User not found" });
        res.json({
            name: user.name,
            email: user.email,
            mobile: user.mobile || "",
            address: user.address || "",
            city: user.city || "",
            state: user.state || "",
            pincode: user.pincode || ""
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// ========================
// PUT /api/users/profile/:email
// ========================
router.put("/profile/:email", async (req, res) => {
    try {
        const { name, mobile, address, city, state, pincode } = req.body;
        const user = await User.findOneAndUpdate(
            { email: req.params.email },
            { name, mobile, address, city, state, pincode },
            { new: true }
        );
        if (!user) return res.status(404).json({ message: "User not found" });
        res.json({ message: "Profile updated", user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// ========================
// GET /api/users/cart/:email
// ========================
router.get("/cart/:email", async (req, res) => {
    try {
        const user = await User.findOne({ email: req.params.email });
        if (!user) return res.status(404).json({ message: "User not found" });
        res.json(user.cart || []);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// ========================
// PUT /api/users/cart/:email
// ========================
router.put("/cart/:email", async (req, res) => {
    try {
        const { cart } = req.body;
        if (!Array.isArray(cart)) {
            return res.status(400).json({ message: "Cart must be an array" });
        }
        const user = await User.findOneAndUpdate(
            { email: req.params.email },
            { cart },
            { new: true }
        );
        if (!user) return res.status(404).json({ message: "User not found" });
        res.json({ message: "Cart updated", cart: user.cart });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// ========================
// DELETE /api/users/cart/:email
// ========================
router.delete("/cart/:email", async (req, res) => {
    try {
        const user = await User.findOneAndUpdate(
            { email: req.params.email },
            { cart: [] },
            { new: true }
        );
        if (!user) return res.status(404).json({ message: "User not found" });
        res.json({ message: "Cart cleared" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;