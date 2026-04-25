import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    username:{
        type: String,
        required: [true,"username is required!!"]
    },
    email: {
        type: String,
        required: [true,"Email is required!!"]
    },
    password: {
        type: String,
        required: [true,"Password is required!!"]
    }
});

const USER = mongoose.model("users",userSchema);

export default USER;