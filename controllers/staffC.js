const Staff = require("../models/staffM.js");
const ApiError = require("../apiError.js");

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

        if (!name || !email || !phone || !role || !salary) {
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

module.exports = {
    getStaff,
    createStaff
};