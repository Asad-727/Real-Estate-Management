const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const propertySchema = new Schema({
    name:{
        type: String,
        required: true
    },
    location:{
        type: String,
        required: true
    },
},
{
    timestamps: true
});

const Property = mongoose.model("Property", propertySchema);

module.exports = Property;