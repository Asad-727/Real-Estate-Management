const Building = require("../models/buildingM.js");
const ApiError = require("../apiError.js");

const getBuildings = async (req, res, next) => {
    try {
        const buildings = await Building.find();

        res.json({
            success: true,
            data: buildings
        });
    } catch (error) {
        next(new ApiError(500, error.message));
    }
};

const createBuilding = async (req, res, next) => {
    try {
        const { name, property } = req.body;

        if (!name || !property) {
            throw new ApiError(400, "Name and property are required");
        }

        const building = await Building.create({
            name,
            property
        });

        res.status(201).json({
            success: true,
            message: "Building created successfully",
            data: building
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getBuildings,
    createBuilding
};

