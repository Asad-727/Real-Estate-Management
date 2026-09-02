const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const notificationSchema = new Schema(
    {
        title: {
            type: String,
            required: true
        },

        message: {
            type: String,
            required: true
        },

        type: {
            type: String,
            enum: ["rent", "payment", "maintenance", "general"],
            default: "general"
        },

        read: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
);

const Notification = mongoose.model(
    "Notification",
    notificationSchema
);

module.exports = Notification;