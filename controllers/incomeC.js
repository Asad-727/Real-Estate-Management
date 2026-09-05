import Income from "../models/incomeM.js";
import ApiError from "../apiError.js";

const getIncomes = async (req, res, next) => {
    try {
        const incomes = await Income.find();

        res.json({
            success: true,
            data: incomes
        });
    } catch (error) {
        next(new ApiError(500, error.message));
    }
};

const createIncome = async (req, res, next) => {
    try {
        const {
            title,
            description,
            amount,
            date
        } = req.body;

        if (
            !title ||
            !description ||
            amount === undefined ||
            !date
        ) {
            throw new ApiError(
                400,
                "Title, description, amount and date are required"
            );
        }

        const income = await Income.create({
            title,
            description,
            amount,
            date
        });

        res.status(201).json({
            success: true,
            message: "Income created successfully",
            data: income
        });
    } catch (error) {
        next(error);
    }
};

const updateIncome = async (req, res, next) => {
    try {
        const income = await Income.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!income) {
            throw new ApiError(404, "Income not found");
        }

        res.json({
            success: true,
            message: "Income updated successfully",
            data: income
        });
    } catch (error) {
        next(error);
    }
};

const deleteIncome = async (req, res, next) => {
    try {
        const income = await Income.findByIdAndDelete(
            req.params.id
        );

        if (!income) {
            throw new ApiError(404, "Income not found");
        }

        res.json({
            success: true,
            message: "Income deleted successfully"
        });
    } catch (error) {
        next(error);
    }
};

export {
    getIncomes,
    createIncome,
    updateIncome,
    deleteIncome
};