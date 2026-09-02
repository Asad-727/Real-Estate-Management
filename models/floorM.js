const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const floorSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },

        building: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Building",
            required: true
        }
    },
    {
        timestamps: true
    }
);

const Floor = mongoose.model("Floor", floorSchema);

module.exports = Floor;