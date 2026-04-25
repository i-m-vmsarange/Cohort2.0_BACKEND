import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();


const connectToDB = async ()=>{

    try{
      const response = await  mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to DB successfully!!!");
    }
    catch(error){
        console.log("Could not connect to DB!!", error.message);
    }
}

export default connectToDB;