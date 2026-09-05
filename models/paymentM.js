import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
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
            required: true
        }
    },
    {
        timestamps: true
    }
);

const Payment = mongoose.model("Payment", paymentSchema);

export default Payment;