import Payment from "../models/paymentM.js";
import Rent from "../models/rentM.js";
import ApiError from "../apiError.js";

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

        if (
            !rent ||
            amount === undefined ||
            !paymentDate ||
            !paymentMethod
        ) {
            throw new ApiError(
                400,
                "Rent, amount, payment date and payment method are required"
            );
        }

        if (amount <= 0) {
            throw new ApiError(
                400,
                "Payment amount must be greater than 0"
            );
        }

        const rentData = await Rent.findById(rent);

        if (!rentData) {
            throw new ApiError(404, "Rent not found");
        }

        const previousPayments = await Payment.find({ rent });

        const totalPaidBefore = previousPayments.reduce(
            (total, payment) => total + payment.amount,
            0
        );

        const remainingBefore = rentData.amount - totalPaidBefore;

        if (remainingBefore <= 0) {
            throw new ApiError(
                400,
                "This rent has already been fully paid"
            );
        }

        if (amount > remainingBefore) {
            throw new ApiError(
                400,
                "Payment cannot be greater than remaining rent"
            );
        }

        const remainingAmount = remainingBefore - amount;

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

const updatePayment = async (req, res, next) => {
    try {
        const payment = await Payment.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!payment) {
            throw new ApiError(404, "Payment not found");
        }

        res.json({
            success: true,
            message: "Payment updated successfully",
            data: payment
        });
    } catch (error) {
        next(error);
    }
};

const deletePayment = async (req, res, next) => {
    try {
        const payment = await Payment.findByIdAndDelete(
            req.params.id
        );

        if (!payment) {
            throw new ApiError(404, "Payment not found");
        }

        res.json({
            success: true,
            message: "Payment deleted successfully"
        });
    } catch (error) {
        next(error);
    }
};

export {
    getPayments,
    createPayment,
    updatePayment,
    deletePayment
};