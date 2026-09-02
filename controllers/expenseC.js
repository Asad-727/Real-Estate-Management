const Expense = require("../models/expenseM.js");
const ApiError = require("../apiError.js");

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

        if (!title || !description || !amount || !date) {
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

module.exports = {
    getExpenses,
    createExpense
};