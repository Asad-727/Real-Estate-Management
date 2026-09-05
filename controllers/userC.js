import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../models/userM.js";
import ApiError from "../apiError.js";

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
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            throw new ApiError(
                400,
                "Name, email and password are required"
            );
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            throw new ApiError(
                400,
                "Email already exists"
            );
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword
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
            throw new ApiError(
                401,
                "Invalid email or password"
            );
        }

        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isMatch) {
            throw new ApiError(
                401,
                "Invalid email or password"
            );
        }

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
            token,
            data: userData
        });
    } catch (error) {
        next(error);
    }
};

const updateUser = async (req, res, next) => {
    try {
        const updateData = { ...req.body };

        if (updateData.password) {
            updateData.password = await bcrypt.hash(
                updateData.password,
                10
            );
        }

        const user = await User.findByIdAndUpdate(
            req.params.id,
            updateData,
            {
                new: true,
                runValidators: true
            }
        ).select("-password");

        if (!user) {
            throw new ApiError(404, "User not found");
        }

        res.json({
            success: true,
            message: "User updated successfully",
            data: user
        });
    } catch (error) {
        next(error);
    }
};

const deleteUser = async (req, res, next) => {
    try {
        const user = await User.findByIdAndDelete(
            req.params.id
        );

        if (!user) {
            throw new ApiError(404, "User not found");
        }

        res.json({
            success: true,
            message: "User deleted successfully"
        });
    } catch (error) {
        next(error);
    }
};

export {
    getUsers,
    createUser,
    loginUser,
    updateUser,
    deleteUser
};