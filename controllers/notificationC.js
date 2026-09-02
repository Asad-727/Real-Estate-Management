const Notification = require("../models/notificationM.js");
const ApiError = require("../apiError.js");

const getNotifications = async (req, res, next) => {
    try {
        const notifications = await Notification.find();

        res.json({
            success: true,
            data: notifications
        });
    } catch (error) {
        next(new ApiError(500, error.message));
    }
};

const createNotification = async (req, res, next) => {
    try {
        const {
            title,
            message,
            type
        } = req.body;

        if (!title || !message) {
            throw new ApiError(
                400,
                "Title and message are required"
            );
        }

        const notification = await Notification.create({
            title,
            message,
            type
        });

        res.status(201).json({
            success: true,
            message: "Notification created successfully",
            data: notification
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getNotifications,
    createNotification
};