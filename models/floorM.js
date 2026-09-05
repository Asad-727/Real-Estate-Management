import mongoose from "mongoose";

const floorSchema = new mongoose.Schema(
    {
        building: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Building",
            required: true
        },

        floorNumber: {
            type: Number,
            required: true
        },

        name: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

const Floor = mongoose.model("Floor", floorSchema);

export default Floor;