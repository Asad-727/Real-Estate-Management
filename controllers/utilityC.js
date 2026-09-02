const Utility = require("../models/utilityM.js");
const ApiError = require("../ApiError.js");

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

        if (!unit || !type || !amount || !dueDate) {
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
            message: "Utility bill created successfully",
            data: utility
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getUtilities,
    createUtility
};