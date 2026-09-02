const User = require("../models/userM.js");
const ApiError = require("../apiError.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const getUsers = async (req, res, next) => {
    try {
        const users = await User.find().select("-password");

        res.json({
            success: true,
            data: users
        });
    } catch (error) {
        next(new ApiError(500, error.message));
    }
};

const createUser = async (req, res, next) => {
    try {
        const {
            name,
            email,
            password,
            role
        } = req.body;

        if (!name || !email || !password) {
            throw new ApiError(
                400,
                "Name, email and password are required"
            );
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role
        });

        const userData = user.toObject();

        delete userData.password;

        res.status(201).json({
            success: true,
            message: "User created successfully",
            data: userData
        });
    } catch (error) {
        next(error);
    }
};

const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            throw new ApiError(
                400,
                "Email and password are required"
            );
        }

        const user = await User.findOne({ email });

        if (!user) {
            throw new ApiError(401, "Invalid email or password");
        }

        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isMatch) {
            throw new ApiError(401, "Invalid email or password");
        }

        // JWT TOKEN
        const token = jwt.sign(
            {
                id: user._id,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d"
            }
        );

        const userData = user.toObject();

        delete userData.password;

        res.json({
            success: true,
            message: "Login successful",
            token: token,
            data: userData
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getUsers,
    createUser,
    loginUser
};