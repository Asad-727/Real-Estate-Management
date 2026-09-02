const Unit = require("../models/unitM.js");
const ApiError = require("../ApiError.js");

const getUnits = async (req, res, next) => {
    try {
        const units = await Unit.find();

        res.json({
            success: true,
            data: units
        });
    } catch (error) {
        next(new ApiError(500, error.message));
    }
};

const createUnit = async (req, res, next) => {
    try {
        const { name, floor } = req.body;

        if (!name || !floor) {
            throw new ApiError(400, "Name and floor are required");
        }

        const unit = await Unit.create({
            name,
            floor
        });

        res.status(201).json({
            success: true,
            message: "Unit created successfully",
            data: unit
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getUnits,
    createUnit
};