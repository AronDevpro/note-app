import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{type:String},
    email: { type: String, required: true, index:true, unique:true, match: [/^\S+@\S+\.\S+$/, 'Please fill a valid email address']},
    password:{type:String},
    createdAt: { type: Date, default: Date.now },
    status: {type:String, default:"active"}

})
export const userModel = mongoose.model("user", userSchema);