const express = require("express");
const Order = require("/models/Order");
const router = express.Router();

// Create an Order
router.post("/", async (req, res) => {
    try {
        const newOrder = new Order(req.body);
        await newOrder.save();
        res.status(201).json({ message: "Order placed successfully!" });
    } catch (error) {
        res.status(500).json({ error: "Failed to place order" });
    }
});

// Get All Orders (for Admin)
router.get("/", async (req, res) => {
    try {
        const orders = await Order.find();
        res.json(orders);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch orders" });
    }
});

// Delete an Order
router.delete("/:id", async (req, res) => {
    try {
        await Order.findByIdAndDelete(req.params.id);
        res.json({ message: "Order deleted successfully!" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete order" });
    }
});

module.exports = router;
