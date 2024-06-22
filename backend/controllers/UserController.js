import {userModel} from "../models/user.model.js";
import bcrypt from "bcrypt";
import {generateToken} from "../utils/jwtUtils.js";
import {verifyToken} from "../utils/authMiddleware.js";


const saltRounds = 10;
// function to get all the users
export const getAllUsers = async (req, res) => {
    try {
        const allData = await userModel.find();
        if (!allData || allData.length === 0) {
            return res.status(400).json({
                success: false,
                message: "No user found"
            })
        }
        return res.status(200).json({
            success: true,
            message: "All users",
            data: allData
        })
    } catch (e) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        })
    }
}

//function to save user
export const saveUser = async (req,res) => {
    try {
        const { name, email, password } = req.body;

        // Validate input
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        // Hash the password
        const hash = await bcrypt.hash(password, saltRounds);

        // Create a new user instance
        const newUser = new userModel({
            name,
            email,
            password: hash,
        });

        // Save the user to the database
        await newUser.save();

        // Respond with success
        return res.status(201).json({
            success: true,
            message: "User saved!",
        });

    } catch (e) {
        // Handle duplicate key error
        if (e.code === 11000) {
            return res.status(400).json({
                success: false,
                message: "User already exists",
            });
        }

        // Handle validation errors
        if (e.name === 'ValidationError') {
            return res.status(400).json({
                success: false,
                message: e.errors.email.message,
            });
        }

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

//function to login user
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid email or password",
            });
        }

        // Compare the provided password with the stored hashed password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({
                success: false,
                message: "Invalid email or password",
            });
        }

        const token = generateToken(user)

        // Respond with success
        return res.status(200).json({
            success: true,
            message: "Login successful!",
            user: {
                id: user._id,
                email: user.email,
                name: user.name,
                status: user.status,
            },
            token: token
        });

    } catch (e) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

export const refreshToken = (req,res)=>{
    try {
        const decodedToken = verifyToken(req.body.token);
        const user = userModel.findById(decodedToken._id);
        if (!user){
            return res.status(400).json({
                success: false,
                message: "User not found",
            });
        }
        const newToken = generateToken(user);

        return res.status(200).json({
            success: true,
            message: "refresh token created",
            token: newToken
        });
    } catch (err){
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
}