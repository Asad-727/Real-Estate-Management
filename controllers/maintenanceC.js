const Maintenance = require("../models/maintenanceM.js");
const ApiError = require("../apiError.js");

const getMaintenances = async (req, res, next) => {
    try {
        const maintenances = await Maintenance.find();

        res.json({
            success: true,
            data: maintenances
        });
    } catch (error) {
        next(new ApiError(500, error.message));
    }
};

const createMaintenance = async (req, res, next) => {
    try {
        const {
            unit,
            title,
            description,
            cost
        } = req.body;

        if (!unit || !title || !description) {
            throw new ApiError(
                400,
                "Unit, title and description are required"
            );
        }

        const maintenance = await Maintenance.create({
            unit,
            title,
            description,
            cost
        });

        res.status(201).json({
            success: true,
            message: "Maintenance request created successfully",
            data: maintenance
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getMaintenances,
    createMaintenance
};