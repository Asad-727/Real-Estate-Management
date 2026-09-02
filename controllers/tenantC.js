const Tenant = require("../models/tenantM.js");
const ApiError = require("../ApiError.js");

const getTenants = async (req, res, next) => {
    try {
        const tenants = await Tenant.find();

        res.json({
            success: true,
            data: tenants
        });
    } catch (error) {
        next(new ApiError(500, error.message));
    }
};

const createTenant = async (req, res, next) => {
    try {
        const { name, email, phone, unit } = req.body;

        if (!name || !email || !phone || !unit) {
            throw new ApiError(
                400,
                "Name, email, phone and unit are required"
            );
        }

        const tenant = await Tenant.create({
            name,
            email,
            phone,
            unit
        });

        res.status(201).json({
            success: true,
            message: "Tenant created successfully",
            data: tenant
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getTenants,
    createTenant
};