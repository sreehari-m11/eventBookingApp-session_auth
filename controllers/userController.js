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
            req.session.username = user.name;
            res.json({
                message: "Login Successful",
                user
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

export { login, register, logout }