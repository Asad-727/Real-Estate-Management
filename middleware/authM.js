const jwt = require("jsonwebtoken");
const ApiError = require("../apiError.js");

const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            throw new ApiError(401, "Authorization token is required");
        }

        const token = authHeader.split(" ")[1];

        if (!token) {
            throw new ApiError(401, "Token is required");
        }

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.user = decoded;

        next();
    } catch (error) {
        next(new ApiError(401, "Invalid or expired token"));
    }
};

module.exports = authMiddleware;