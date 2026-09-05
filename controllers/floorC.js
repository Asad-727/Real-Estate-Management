import Floor from "../models/floorM.js";
import ApiError from "../apiError.js";

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
        const { building, floorNumber, name } = req.body;

        if (!building || floorNumber === undefined || !name) {
            throw new ApiError(
                400,
                "Building, floor number and name are required"
            );
        }

        const floor = await Floor.create({
            building,
            floorNumber,
            name
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

const updateFloor = async (req, res, next) => {
    try {
        const floor = await Floor.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!floor) {
            throw new ApiError(404, "Floor not found");
        }

        res.json({
            success: true,
            message: "Floor updated successfully",
            data: floor
        });
    } catch (error) {
        next(error);
    }
};

const deleteFloor = async (req, res, next) => {
    try {
        const floor = await Floor.findByIdAndDelete(req.params.id);

        if (!floor) {
            throw new ApiError(404, "Floor not found");
        }

        res.json({
            success: true,
            message: "Floor deleted successfully"
        });
    } catch (error) {
        next(error);
    }
};

export {
    getFloors,
    createFloor,
    updateFloor,
    deleteFloor
};