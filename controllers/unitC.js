import Unit from "../models/unitM.js";
import ApiError from "../apiError.js";

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
        const {
            floor,
            unitNumber,
            type,
            status,
            rent
        } = req.body;

        if (!floor || !unitNumber || !type || rent === undefined) {
            throw new ApiError(
                400,
                "Floor, unit number, type and rent are required"
            );
        }

        const unit = await Unit.create({
            floor,
            unitNumber,
            type,
            status,
            rent
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

const updateUnit = async (req, res, next) => {
    try {
        const unit = await Unit.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!unit) {
            throw new ApiError(404, "Unit not found");
        }

        res.json({
            success: true,
            message: "Unit updated successfully",
            data: unit
        });
    } catch (error) {
        next(error);
    }
};

const deleteUnit = async (req, res, next) => {
    try {
        const unit = await Unit.findByIdAndDelete(req.params.id);

        if (!unit) {
            throw new ApiError(404, "Unit not found");
        }

        res.json({
            success: true,
            message: "Unit deleted successfully"
        });
    } catch (error) {
        next(error);
    }
};

export {
    getUnits,
    createUnit,
    updateUnit,
    deleteUnit
};