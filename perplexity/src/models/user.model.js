import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is required!!"],
        unique : [true,"User must be unique!!"]
    },
    email: {
        type: String,
        required: [true,"Email is required"],
        unique: [true,"Email must be unique!!"]
    },
   password: {
    type:String,
    required: [true, "Password is required!!"],
    select: false
   },
   verified: {
    type: Boolean,
     default: false
   }
},{
    timestamps: true
});

const USER = mongoose.model("users",userSchema);

export default USER;