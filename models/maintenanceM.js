import mongoose from "mongoose";

const maintenanceSchema = new mongoose.Schema(
    {
        unit: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Unit",
            required: true
        },

        title: {
            type: String,
            required: true
        },

        description: {
            type: String,
            required: true
        },

        cost: {
            type: Number,
            default: 0
        },

        status: {
            type: String,
            enum: ["pending", "in-progress", "completed"],
            default: "pending"
        }
    },
    {
        timestamps: true
    }
);

const Maintenance = mongoose.model(
    "Maintenance",
    maintenanceSchema
);

export default Maintenance;