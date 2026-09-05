import Property from "../models/propertyM.js";
import ApiError from "../apiError.js";

const getProperties = async (req, res, next) => {
    try {
        const properties = await Property.find();

        res.json({
            success: true,
            data: properties
        });
    } catch (error) {
        next(new ApiError(500, error.message));
    }
};

const createProperty = async (req, res, next) => {
    try {
        const { name, location } = req.body;

        if (!name || !location) {
            throw new ApiError(
                400,
                "Name and location are required"
            );
        }

        const property = await Property.create({
            name,
            location
        });

        res.status(201).json({
            success: true,
            message: "Property created successfully",
            data: property
        });
    } catch (error) {
        next(error);
    }
};

const updateProperty = async (req, res, next) => {
    try {
        const property = await Property.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!property) {
            throw new ApiError(404, "Property not found");
        }

        res.json({
            success: true,
            message: "Property updated successfully",
            data: property
        });
    } catch (error) {
        next(error);
    }
};

const deleteProperty = async (req, res, next) => {
    try {
        const property = await Property.findByIdAndDelete(
            req.params.id
        );

        if (!property) {
            throw new ApiError(404, "Property not found");
        }

        res.json({
            success: true,
            message: "Property deleted successfully"
        });
    } catch (error) {
        next(error);
    }
};

export {
    getProperties,
    createProperty,
    updateProperty,
    deleteProperty
}