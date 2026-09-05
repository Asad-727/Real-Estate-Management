import mongoose from "mongoose";

const contractSchema = new mongoose.Schema(
    {
        unit: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Unit",
            required: true
        },

        tenant: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Tenant",
            required: true
        },

        startDate: {
            type: Date,
            required: true
        },

        endDate: {
            type: Date,
            required: true
        },

        monthlyRent: {
            type: Number,
            required: true
        }
    },
    {
        timestamps: true
    }
);

const Contract = mongoose.model("Contract", contractSchema);

export default Contract;