import mongoose from "mongoose";
import * as dotenv from 'dotenv';
mongoose.set('strictQuery', false)

async function connect () {

    try{
        await mongoose.connect(process.env.MONGODB_URL);
   
        console.log("Sever connected with MongoDB");
    } catch (error){
        console.log("Sever connect fail ");
    }

};
export default {connect};
