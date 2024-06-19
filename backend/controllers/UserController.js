import {userModel} from "../models/user.model.js";

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
        const user = new userModel(req.body);
        await user.save();
        return res.status(200).json({
            success: true,
            message: "user saved!",
        })

    } catch (e) {
        // Handle duplicate key error
        if (e.code === 11000) {
            return res.status(400).json({
                success: false,
                message: "Duplicate field value: email already exists",
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
        if (!user || user.password !== password) {
            return res.status(400).json({
                success: false,
                message: "Invalid email or password",
            });
        }

        // Respond with success
        return res.status(200).json({
            success: true,
            message: "Login successful!",
            user: {
                id: user._id,
                email: user.email,
                name: user.name,
                status: user.status,
            }
        });

    } catch (e) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};