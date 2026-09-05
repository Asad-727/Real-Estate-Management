import Contract from "../models/contractM.js";
import ApiError from "../apiError.js";

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
            unit,
            tenant,
            startDate,
            endDate,
            monthlyRent
        } = req.body;

        if (
            !unit ||
            !tenant ||
            !startDate ||
            !endDate ||
            monthlyRent === undefined
        ) {
            throw new ApiError(
                400,
                "Unit, tenant, start date, end date and monthly rent are required"
            );
        }

        const contract = await Contract.create({
            unit,
            tenant,
            startDate,
            endDate,
            monthlyRent
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

const updateContract = async (req, res, next) => {
    try {
        const contract = await Contract.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!contract) {
            throw new ApiError(404, "Contract not found");
        }

        res.json({
            success: true,
            message: "Contract updated successfully",
            data: contract
        });
    } catch (error) {
        next(error);
    }
};

const deleteContract = async (req, res, next) => {
    try {
        const contract = await Contract.findByIdAndDelete(
            req.params.id
        );

        if (!contract) {
            throw new ApiError(404, "Contract not found");
        }

        res.json({
            success: true,
            message: "Contract deleted successfully"
        });
    } catch (error) {
        next(error);
    }
};

export {
    getContracts,
    createContract,
    updateContract,
    deleteContract
};