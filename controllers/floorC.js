const Floor = require("../models/floorM.js");
const ApiError = require("../ApiError.js");

const getFloors = async (req, res, next) => {
    try {
        const floors = await Floor.find();

        res.json({
            success: true,
            data: floors
        });
    } catch (error) {
        next(new ApiError(500, error.message));
    }
};

const createFloor = async (req, res, next) => {
    try {
        const { name, building } = req.body;

        if (!name || !building) {
            throw new ApiError(400, "Name and building are required");
        }

        const floor = await Floor.create({
            name,
            building
        });

        res.status(201).json({
            success: true,
            message: "Floor created successfully",
            data: floor
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getFloors,
    createFloor
};