import Utility from "../models/utilityM.js";
import ApiError from "../apiError.js";

const getUtilities = async (req, res, next) => {
    try {
        const utilities = await Utility.find();

        res.json({
            success: true,
            data: utilities
        });
    } catch (error) {
        next(new ApiError(500, error.message));
    }
};

const createUtility = async (req, res, next) => {
    try {
        const {
            unit,
            type,
            amount,
            dueDate
        } = req.body;

        if (
            !unit ||
            !type ||
            amount === undefined ||
            !dueDate
        ) {
            throw new ApiError(
                400,
                "Unit, type, amount and due date are required"
            );
        }

        const utility = await Utility.create({
            unit,
            type,
            amount,
            dueDate
        });

        res.status(201).json({
            success: true,
            message: "Utility created successfully",
            data: utility
        });
    } catch (error) {
        next(error);
    }
};

const updateUtility = async (req, res, next) => {
    try {
        const utility = await Utility.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!utility) {
            throw new ApiError(404, "Utility not found");
        }

        res.json({
            success: true,
            message: "Utility updated successfully",
            data: utility
        });
    } catch (error) {
        next(error);
    }
};

const deleteUtility = async (req, res, next) => {
    try {
        const utility = await Utility.findByIdAndDelete(
            req.params.id
        );

        if (!utility) {
            throw new ApiError(404, "Utility not found");
        }

        res.json({
            success: true,
            message: "Utility deleted successfully"
        });
    } catch (error) {
        next(error);
    }
};

export {
    getUtilities,
    createUtility,
    updateUtility,
    deleteUtility
};