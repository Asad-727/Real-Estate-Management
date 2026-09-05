import mongoose from "mongoose";

const unitSchema = new mongoose.Schema(
    {
        floor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Floor",
            required: true
        },

        unitNumber: {
            type: String,
            required: true
        },

        type: {
            type: String,
            required: true
        },

        status: {
            type: String,
            enum: ["available", "occupied"],
            default: "available"
        },

        rent: {
            type: Number,
            required: true
        }
    },
    {
        timestamps: true
    }
);

const Unit = mongoose.model("Unit", unitSchema);

export default Unit;