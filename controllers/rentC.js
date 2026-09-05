import Rent from "../models/rentM.js";
import ApiError from "../apiError.js";

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

        if (
            !contract ||
            !month ||
            amount === undefined ||
            !dueDate
        ) {
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

const updateRent = async (req, res, next) => {
    try {
        const rent = await Rent.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!rent) {
            throw new ApiError(404, "Rent not found");
        }

        res.json({
            success: true,
            message: "Rent updated successfully",
            data: rent
        });
    } catch (error) {
        next(error);
    }
};

const deleteRent = async (req, res, next) => {
    try {
        const rent = await Rent.findByIdAndDelete(
            req.params.id
        );

        if (!rent) {
            throw new ApiError(404, "Rent not found");
        }

        res.json({
            success: true,
            message: "Rent deleted successfully"
        });
    } catch (error) {
        next(error);
    }
};

export {
    getRents,
    createRent,
    updateRent,
    deleteRent
};