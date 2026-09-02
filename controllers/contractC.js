const Contract = require("../models/contractM.js");
const ApiError = require("../apiError.js");

const getContracts = async (req, res, next) => {
    try {
        const contracts = await Contract.find();

        res.json({
            success: true,
            data: contracts
        });
    } catch (error) {
        next(new ApiError(500, error.message));
    }
};

const createContract = async (req, res, next) => {
    try {
        const {
            tenant,
            unit,
            monthlyRent,
            startDate,
            endDate
        } = req.body;

        if (
            !tenant ||
            !unit ||
            !monthlyRent ||
            !startDate ||
            !endDate
        ) {
            throw new ApiError(
                400,
                "Tenant, unit, monthly rent, start date and end date are required"
            );
        }

        const contract = await Contract.create({
            tenant,
            unit,
            monthlyRent,
            startDate,
            endDate
        });

        res.status(201).json({
            success: true,
            message: "Contract created successfully",
            data: contract
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getContracts,
    createContract
};