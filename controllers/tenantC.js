import Tenant from "../models/tenantM.js";
import ApiError from "../apiError.js";

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
        const { name, email, phone, cnic } = req.body;

        if (!name || !email || !phone || !cnic) {
            throw new ApiError(
                400,
                "Name, email, phone and cnic are required"
            );
        }

        const tenant = await Tenant.create({
            name,
            email,
            phone,
            cnic
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

const updateTenant = async (req, res, next) => {
    try {
        const tenant = await Tenant.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!tenant) {
            throw new ApiError(404, "Tenant not found");
        }

        res.json({
            success: true,
            message: "Tenant updated successfully",
            data: tenant
        });
    } catch (error) {
        next(error);
    }
};

const deleteTenant = async (req, res, next) => {
    try {
        const tenant = await Tenant.findByIdAndDelete(req.params.id);

        if (!tenant) {
            throw new ApiError(404, "Tenant not found");
        }

        res.json({
            success: true,
            message: "Tenant deleted successfully"
        });
    } catch (error) {
        next(error);
    }
};

export {
    getTenants,
    createTenant,
    updateTenant,
    deleteTenant
};