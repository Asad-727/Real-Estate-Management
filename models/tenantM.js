const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const tenantSchema = new Schema(
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

        unit: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Unit",
            required: true
        }
    },
    {
        timestamps: true
    }
);

const Tenant = mongoose.model("Tenant", tenantSchema);

module.exports = Tenant;