import mongoose from "mongoose";
import User from "../models/User.js";



const register = async (req, res) => {
    const { name, password, email } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(401).json({
                message: "Email already registered"
            })
        }
        const newUser = {
            name,
            password,
            email
        }
        const user = new User(newUser);
        user.save();
        res.status(201).json({
            message: "Created new user",
            user
        })
    } catch (err) {
        res.status(500).json({
            message: "User creation failed",
            errorMessage: err.message
        })
    }
}


const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({
                message: "There is no user registered with this email"
            })
        }

        if (password === user.password) {
            req.session.userId = user._id;
            res.json({
                message: "Login Successful",
            })
        } else {
            res.status(401).json({
                message: "Username or password is incorrect"
            })
        }
    } catch (err) {
        res.status(500).json({
            message: "Login failed due to an error",
            errorMessage: err.message
        })
    }
}


const logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({
                message: "Logout failed"
            })
        }
        res.clearCookie('connect.sid');
        res.json({
            message: "Logged out!"
        })
    })
}

const getDashboard = async (req, res) => {
    const id = req.session.userId;

    try {
        const user = await User.findById(id).populate('bookings');

        if (!user) {
            return res.status(401).json({
                message: "User not found"
            })
        }
        res.status(200).json({
            name: user.name,
            email: user.email,
            bookings: user.bookings
        })
    } catch (error) {
        res.status(500).json({
            message: "Failed fetching details"
        })
    }
}

export { login, register, logout, getDashboard }