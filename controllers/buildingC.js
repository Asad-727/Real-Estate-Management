import Building from "../models/buildingM.js";
import ApiError from "../apiError.js";

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
            throw new ApiError(
                400,
                "Name and property are required"
            );
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

const updateBuilding = async (req, res, next) => {
    try {
        const building = await Building.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!building) {
            throw new ApiError(404, "Building not found");
        }

        res.json({
            success: true,
            message: "Building updated successfully",
            data: building
        });
    } catch (error) {
        next(error);
    }
};

const deleteBuilding = async (req, res, next) => {
    try {
        const building = await Building.findByIdAndDelete(
            req.params.id
        );

        if (!building) {
            throw new ApiError(404, "Building not found");
        }

        res.json({
            success: true,
            message: "Building deleted successfully"
        });
    } catch (error) {
        next(error);
    }
};

export {
    getBuildings,
    createBuilding,
    updateBuilding,
    deleteBuilding
};