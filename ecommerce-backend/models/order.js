const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
    name: String,
    phone: String,
    address: String,
    items: [
        {
            name: String,
            price: Number,
            quantity: Number,
        }
    ],
    total: Number,
    timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Order", OrderSchema);
