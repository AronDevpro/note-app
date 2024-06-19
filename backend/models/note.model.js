import mongoose from "mongoose";

const schema = new mongoose.Schema({
    title:{type:String, required:true},
    content:{type:String},
    userId:{type:mongoose.Schema.ObjectId, ref:'user', required: true},
})

export const noteModel = mongoose.model("note", schema);