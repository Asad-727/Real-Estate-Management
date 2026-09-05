import mongoose from "mongoose";

const utilitySchema = new mongoose.Schema(
    {
        unit: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Unit",
            required: true
        },

        type: {
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

const Utility = mongoose.model("Utility", utilitySchema);

export default Utility;