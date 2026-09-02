const Income = require("../models/incomeM.js");
const ApiError = require("../apiError.js");

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

        if (!title || !description || !amount || !date) {
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

module.exports = {
    getIncomes,
    createIncome
};