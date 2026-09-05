import Staff from "../models/staffM.js";
import ApiError from "../apiError.js";

const getStaff = async (req, res, next) => {
    try {
        const staff = await Staff.find();

        res.json({
            success: true,
            data: staff
        });
    } catch (error) {
        next(new ApiError(500, error.message));
    }
};

const createStaff = async (req, res, next) => {
    try {
        const {
            name,
            email,
            phone,
            role,
            salary
        } = req.body;

        if (!name || !email || !phone || !role || salary === undefined) {
            throw new ApiError(
                400,
                "Name, email, phone, role and salary are required"
            );
        }

        const staff = await Staff.create({
            name,
            email,
            phone,
            role,
            salary
        });

        res.status(201).json({
            success: true,
            message: "Staff created successfully",
            data: staff
        });
    } catch (error) {
        next(error);
    }
};

const updateStaff = async (req, res, next) => {
    try {
        const staff = await Staff.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!staff) {
            throw new ApiError(404, "Staff not found");
        }

        res.json({
            success: true,
            message: "Staff updated successfully",
            data: staff
        });
    } catch (error) {
        next(error);
    }
};

const deleteStaff = async (req, res, next) => {
    try {
        const staff = await Staff.findByIdAndDelete(req.params.id);

        if (!staff) {
            throw new ApiError(404, "Staff not found");
        }

        res.json({
            success: true,
            message: "Staff deleted successfully"
        });
    } catch (error) {
        next(error);
    }
};

export {
    getStaff,
    createStaff,
    updateStaff,
    deleteStaff
};