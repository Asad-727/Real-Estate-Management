const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const staffSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },

        email: {
            type: String,
            required: true
        },

        phone: {
            type: String,
            required: true
        },

        role: {
            type: String,
            required: true
        },

        salary: {
            type: Number,
            required: true
        }
    },
    {
        timestamps: true
    }
);

const Staff = mongoose.model("Staff", staffSchema);

module.exports = Staff;