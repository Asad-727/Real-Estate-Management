const Income = require("../models/incomeM.js");
const Expense = require("../models/expenseM.js");
const ApiError = require("../apiError.js");

const getFinancialReport = async (req, res, next) => {
    try {
        const incomes = await Income.find();
        const expenses = await Expense.find();

        const totalIncome = incomes.reduce(
            (total, income) => total + income.amount,
            0
        );

        const totalExpense = expenses.reduce(
            (total, expense) => total + expense.amount,
            0
        );

        const profit = totalIncome - totalExpense;

        res.json({
            success: true,
            data: {
                totalIncome,
                totalExpense,
                profit
            }
        });
    } catch (error) {
        next(new ApiError(500, error.message));
    }
};

module.exports = {
    getFinancialReport
};