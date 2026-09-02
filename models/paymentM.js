const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const paymentSchema = new Schema(
    {
        rent: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Rent",
            required: true
        },

        amount: {
            type: Number,
            required: true
        },

        remainingAmount: {
            type: Number,
            required: true
        },

        paymentDate: {
            type: Date,
            required: true
        },

        paymentMethod: {
            type: String,
            enum: ["cash", "bank", "online"],
            required: true
        }
    },
    {
        timestamps: true
    }
);

const Payment = mongoose.model("Payment", paymentSchema);

module.exports = Payment;