import Maintenance from "../models/maintenanceM.js";
import ApiError from "../apiError.js";

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
            message: "Maintenance created successfully",
            data: maintenance
        });
    } catch (error) {
        next(error);
    }
};

const updateMaintenance = async (req, res, next) => {
    try {
        const maintenance = await Maintenance.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!maintenance) {
            throw new ApiError(404, "Maintenance not found");
        }

        res.json({
            success: true,
            message: "Maintenance updated successfully",
            data: maintenance
        });
    } catch (error) {
        next(error);
    }
};

const deleteMaintenance = async (req, res, next) => {
    try {
        const maintenance = await Maintenance.findByIdAndDelete(
            req.params.id
        );

        if (!maintenance) {
            throw new ApiError(404, "Maintenance not found");
        }

        res.json({
            success: true,
            message: "Maintenance deleted successfully"
        });
    } catch (error) {
        next(error);
    }
};

export {
    getMaintenances,
    createMaintenance,
    updateMaintenance,
    deleteMaintenance
};