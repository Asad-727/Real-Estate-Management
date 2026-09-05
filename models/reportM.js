import ApiError from "../apiError.js";

const getReports = async (req, res, next) => {
    try {
        res.json({
            success: true,
            message: "Reports API is working"
        });
    } catch (error) {
        next(new ApiError(500, error.message));
    }
};

export {
    getReports
};