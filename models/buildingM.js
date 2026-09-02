const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const buildingSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    property:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Property",
        required: true
    },
},
{
    timestamps: true
});

const Building = mongoose.model("Building", buildingSchema);

module.exports = Building;