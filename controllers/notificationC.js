import Notification from "../models/notificationM.js";
import ApiError from "../apiError.js";

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
        const { title, message, type } = req.body;

        if (!title || !message || !type) {
            throw new ApiError(
                400,
                "Title, message and type are required"
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

const updateNotification = async (req, res, next) => {
    try {
        const notification =
            await Notification.findByIdAndUpdate(
                req.params.id,
                req.body,
                {
                    new: true,
                    runValidators: true
                }
            );

        if (!notification) {
            throw new ApiError(404, "Notification not found");
        }

        res.json({
            success: true,
            message: "Notification updated successfully",
            data: notification
        });
    } catch (error) {
        next(error);
    }
};

const deleteNotification = async (req, res, next) => {
    try {
        const notification =
            await Notification.findByIdAndDelete(
                req.params.id
            );

        if (!notification) {
            throw new ApiError(404, "Notification not found");
        }

        res.json({
            success: true,
            message: "Notification deleted successfully"
        });
    } catch (error) {
        next(error);
    }
};

export {
    getNotifications,
    createNotification,
    updateNotification,
    deleteNotification
};