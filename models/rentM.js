const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const rentSchema = new Schema(
    {
        contract: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Contract",
            required: true
        },

        month: {
            type: String,
            required: true
        },

        amount: {
            type: Number,
            required: true
        },

        dueDate: {
            type: Date,
            required: true
        },

        status: {
            type: String,
            enum: ["unpaid", "paid", "overdue"],
            default: "unpaid"
        }
    },
    {
        timestamps: true
    }
);

const Rent = mongoose.model("Rent", rentSchema);

module.exports = Rent;