const mongoose = require("mongoose")
const Schema = mongoose.Schema;


const transactionSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    products: [
        {
            productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
            quantity: { type: Number, required: true },
            totalPrice: { type: Number, required: true }
        }
    ],
    
    timestamp: { type: Date, default: Date.now }
});

const Transaction = mongoose.model("Transaction", transactionSchema)

module.exports = Transaction



