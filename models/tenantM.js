import mongoose from "mongoose";

const tenantSchema = new mongoose.Schema(
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

        cnic: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

const Tenant = mongoose.model("Tenant", tenantSchema);

export default Tenant;