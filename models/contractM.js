const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const contractSchema = new Schema(
    {
        tenant: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Tenant",
            required: true
        },

        unit: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Unit",
            required: true
        },

        monthlyRent: {
            type: Number,
            required: true
        },

        startDate: {
            type: Date,
            required: true
        },

        endDate: {
            type: Date,
            required: true
        }
    },
    {
        timestamps: true
    }
);

const Contract = mongoose.model("Contract", contractSchema);

module.exports = Contract;