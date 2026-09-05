import Expense from "../models/expenseM.js";
import ApiError from "../apiError.js";

const getExpenses = async (req, res, next) => {
    try {
        const expenses = await Expense.find();

        res.json({
            success: true,
            data: expenses
        });
    } catch (error) {
        next(new ApiError(500, error.message));
    }
};

const createExpense = async (req, res, next) => {
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

        const expense = await Expense.create({
            title,
            description,
            amount,
            date
        });

        res.status(201).json({
            success: true,
            message: "Expense created successfully",
            data: expense
        });
    } catch (error) {
        next(error);
    }
};

const updateExpense = async (req, res, next) => {
    try {
        const expense = await Expense.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!expense) {
            throw new ApiError(404, "Expense not found");
        }

        res.json({
            success: true,
            message: "Expense updated successfully",
            data: expense
        });
    } catch (error) {
        next(error);
    }
};

const deleteExpense = async (req, res, next) => {
    try {
        const expense = await Expense.findByIdAndDelete(
            req.params.id
        );

        if (!expense) {
            throw new ApiError(404, "Expense not found");
        }

        res.json({
            success: true,
            message: "Expense deleted successfully"
        });
    } catch (error) {
        next(error);
    }
};

export {
    getExpenses,
    createExpense,
    updateExpense,
    deleteExpense
};