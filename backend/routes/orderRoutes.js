const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const Order = require("../models/Order");
const User = require("../models/User");

dotenv.config();

// Create Nodemailer transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// POST /api/orders
// Receives: { items: [], total: number, user: { email, name, mobile, address, city, state, pincode } }
router.post("/", async (req, res) => {
    try {
        const { items, total, user } = req.body;

        if (!items || items.length === 0) {
            return res.status(400).json({ message: "Cart is empty" });
        }

        // Format ordered products list for email
        const productListHtml = items.map(item => `
            <tr>
                <td style="padding: 10px; border-bottom: 1px solid #ddd;">
                    <img src="${item.image}" alt="${item.name}" style="width: 50px; height: 50px; object-fit: contain;">
                </td>
                <td style="padding: 10px; border-bottom: 1px solid #ddd;">${item.name}</td>
                <td style="padding: 10px; border-bottom: 1px solid #ddd;">${item.quantity}</td>
                <td style="padding: 10px; border-bottom: 1px solid #ddd;">₹${item.price.toLocaleString('en-IN')}</td>
            </tr>
        `).join("");

        // 1. Buyer Email Template
        const buyerMailOptions = {
            from: process.env.EMAIL_USER,
            to: user.email,
            subject: "Order Confirmation - SmartCart",
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
                    <h2 style="color: #2874f0; text-align: center;">Order Confirmed!</h2>
                    <p>Hi ${user.name || 'Customer'},</p>
                    <p>Thank you for shopping with SmartCart. Your order has been successfully placed.</p>
                    
                    <h3 style="border-bottom: 2px solid #2874f0; padding-bottom: 5px;">Order Details</h3>
                    <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
                        <thead>
                            <tr style="background-color: #f5f5f5;">
                                <th style="padding: 10px; text-align: left;">Image</th>
                                <th style="padding: 10px; text-align: left;">Product</th>
                                <th style="padding: 10px; text-align: left;">Qty</th>
                                <th style="padding: 10px; text-align: left;">Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${productListHtml}
                        </tbody>
                    </table>
                    
                    <h3 style="text-align: right; color: #212121;">Total Amount: ₹${total.toLocaleString('en-IN')}</h3>
                    
                    <p style="color: #555; margin-top: 30px;">We will notify you once your order is shipped.</p>
                    <p>Best regards,<br><strong>SmartCart Team</strong></p>
                </div>
            `
        };

        // 2. Seller Email Template
        const sellerMailOptions = {
            from: process.env.EMAIL_USER,
            to: "kartik131972y@gmail.com",
            subject: "New Order Received - SmartCart",
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
                    <h2 style="color: #ff9f00; text-align: center;">New Order Alert!</h2>
                    
                    <h3 style="border-bottom: 2px solid #ff9f00; padding-bottom: 5px;">Buyer Details</h3>
                    <p><strong>Name:</strong> ${user.name || 'N/A'}</p>
                    <p><strong>Email:</strong> ${user.email || 'N/A'}</p>
                    <p><strong>Mobile:</strong> ${user.mobile || 'N/A'}</p>
                    <p><strong>Shipping Address:</strong><br>
                        ${user.address || 'N/A'}<br>
                        ${user.city || ''}, ${user.state || ''} - ${user.pincode || ''}
                    </p>
                    
                    <h3 style="border-bottom: 2px solid #ff9f00; padding-bottom: 5px; margin-top: 20px;">Ordered Products</h3>
                    <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
                        <thead>
                            <tr style="background-color: #f5f5f5;">
                                <th style="padding: 10px; text-align: left;">Image</th>
                                <th style="padding: 10px; text-align: left;">Product</th>
                                <th style="padding: 10px; text-align: left;">Qty</th>
                                <th style="padding: 10px; text-align: left;">Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${productListHtml}
                        </tbody>
                    </table>
                    
                    <h3 style="text-align: right; color: #212121;">Total Value: ₹${total.toLocaleString('en-IN')}</h3>
                </div>
            `
        };

        // Send emails
        // We wrap in try-catch so that if email credentials are not set, it doesn't crash the server,
        // it just logs the error and still returns success to the user so the checkout flow works.
        try {
            if(process.env.EMAIL_USER && process.env.EMAIL_PASS) {
                if (user && user.email) {
                    await transporter.sendMail(buyerMailOptions);
                } else {
                    console.error("Skipping buyer confirmation email: Buyer email address is missing/unavailable.");
                }
                
                await transporter.sendMail(sellerMailOptions);
                console.log("Order emails processed successfully.");
            } else {
                console.log("Order processed, but emails were skipped because EMAIL_USER or EMAIL_PASS is missing in .env");
            }
        } catch (emailError) {
            console.error("Failed to send order emails:", emailError.message);
            // Optionally could fail the order here, but usually better to log and proceed
        }

        // Save order to MongoDB and clear user's DB cart
        try {
            const userDoc = await User.findOne({ email: user?.email });
            if (userDoc) {
                const newOrder = new Order({
                    userId: userDoc._id,
                    products: items.map(item => ({
                        name: item.name,
                        price: item.price,
                        quantity: item.quantity,
                        image: item.image
                    })),
                    totalAmount: total
                });
                await newOrder.save();
                // Clear user's cart in DB after successful order
                await User.findOneAndUpdate({ email: user?.email }, { cart: [] });
                console.log("Order saved to DB and cart cleared for:", user?.email);
            } else {
                console.log("User not found in DB, order not saved (guest checkout).");
            }
        } catch (dbError) {
            console.error("Failed to save order to DB:", dbError.message);
        }

        res.status(200).json({ message: "Order placed successfully" });
    } catch (error) {
        console.error("Order Error:", error);
        res.status(500).json({ message: "Server Error during checkout" });
    }
});

// GET /api/orders/:email — Order history for a user
router.get("/:email", async (req, res) => {
    try {
        const userDoc = await User.findOne({ email: req.params.email });
        if (!userDoc) return res.status(404).json({ message: "User not found" });
        const orders = await Order.find({ userId: userDoc._id }).sort({ createdAt: -1 });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
