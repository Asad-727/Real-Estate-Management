const Payment = require("../models/paymentM.js");
const Rent = require("../models/rentM.js");
const ApiError = require("../apiError.js");

const getPayments = async (req, res, next) => {
    try {
        const payments = await Payment.find();

        res.json({
            success: true,
            data: payments
        });
    } catch (error) {
        next(new ApiError(500, error.message));
    }
};

const createPayment = async (req, res, next) => {
    try {
        const {
            rent,
            amount,
            paymentDate,
            paymentMethod
        } = req.body;

        if (!rent || !amount || !paymentDate || !paymentMethod) {
            throw new ApiError(
                400,
                "Rent, amount, payment date and payment method are required"
            );
        }

        const rentData = await Rent.findById(rent);

        if (!rentData) {
            throw new ApiError(404, "Rent not found");
        }

        const remainingAmount = rentData.amount - amount;

        if (remainingAmount < 0) {
            throw new ApiError(
                400,
                "Payment cannot be greater than rent"
            );
        }

        const payment = await Payment.create({
            rent,
            amount,
            remainingAmount,
            paymentDate,
            paymentMethod
        });

        if (remainingAmount === 0) {
            await Rent.findByIdAndUpdate(rent, {
                status: "paid"
            });
        }

        res.status(201).json({
            success: true,
            message: "Payment created successfully",
            data: payment
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getPayments,
    createPayment
};