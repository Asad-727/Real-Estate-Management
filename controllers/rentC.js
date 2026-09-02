const Rent = require("../models/rentM.js");
const ApiError = require("../apiError.js");

const getRents = async (req, res, next) => {
    try {
        const rents = await Rent.find();

        const today = new Date();

        for (const rent of rents) {
            if (
                rent.status === "unpaid" &&
                new Date(rent.dueDate) < today
            ) {
                rent.status = "overdue";
                await rent.save();
            }
        }

        res.json({
            success: true,
            data: rents
        });
    } catch (error) {
        next(new ApiError(500, error.message));
    }
};

const createRent = async (req, res, next) => {
    try {
        const {
            contract,
            month,
            amount,
            dueDate
        } = req.body;

        if (!contract || !month || !amount || !dueDate) {
            throw new ApiError(
                400,
                "Contract, month, amount and due date are required"
            );
        }

        const rent = await Rent.create({
            contract,
            month,
            amount,
            dueDate
        });

        res.status(201).json({
            success: true,
            message: "Rent created successfully",
            data: rent
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getRents,
    createRent
};