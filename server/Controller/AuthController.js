import mongoose from "mongoose";
import User from "../Model/User.js";
import { comparePasswordAndHashPassword, passwordHash } from "../Helper/AuthHelper.js";
import jwt from "jsonwebtoken";

export const registerUserController = async (req, res, next) => {

    try {
        const { name, username, email, password } = req.body;

        if (!name) {
            return res.status(400).send({
                success: false,
                message: "first name is required"
            });
        }

        if (!username) {
            return res.status(400).send({
                success: false,
                message: "user name is required"
            });
        }

        if (!email) {
            return res.status(400).send({
                success: false,
                message: "email is required"
            });
        }

        if (!password) {
            return res.status(400).send({
                success: false,
                message: "password is required"
            });
        }

        const checkExistingUser = await User.findOne({ email });
        if (checkExistingUser) {
            return res.status(409).send({
                success: false,
                message: "Email already exists. Try login"
            })
        }

        const checkExistingUsername = await User.findOne({ username });
        if (checkExistingUsername) {
            return res.status(409).send({
                success: false,
                message: "Username already exists. Try dfferent username"
            })
        }

        const hashedPassword = await passwordHash(password);
        const user = await new User({ name, username, email, password: hashedPassword });
        if (user) {
           await user.save();

            const { password, ...other } = user._doc;

            return res.status(201).send({
                success: true,
                message: "User registered successfully",
                other
            });
        }
        else {
            return res.status(400).send({
                success: false,
                message: "Something went wrong with user registration",
            })
        }

    }
    catch (error) {
        console.log(error);
        return res.status(400).send({
            success: false,
            message: "Something went wrong with user registration",
            error
        })
    }
}


export const loginUserController = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email) {
            return res.status(400).send({
                success: false,
                message: "email is required"
            });
        }

        if (!password) {
            return res.status(400).send({
                success: false,
                message: "password is required"
            });
        }

        const user = await User.findOne({ email });

        if (user) {
            const passwordCompare = await comparePasswordAndHashPassword(password, user.password);
            if (passwordCompare) {
                const { password, ...other } = user._doc;

                const token = jwt.sign({ _id: user.id }, process.env.JWT_SEC, { expiresIn: '7d' });
                other.token = token;
                return res.cookie(
                    "access_token", token, {
                    httpOnly: true
                }).status(200).send({
                    success: true,
                    message: "User loggedin successfully",
                    other
                })
            }

        }

    }
    catch (error) {
        console.log(error);
        return res.status(400).send({
            success: false,
            message: "Something went wrong with user login",
            error
        })
    }
}