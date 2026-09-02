const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const utilitySchema = new Schema(
    {
        unit: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Unit",
            required: true
        },

        type: {
            type: String,
            enum: ["electricity", "water", "gas"],
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

const Utility = mongoose.model("Utility", utilitySchema);

module.exports = Utility;