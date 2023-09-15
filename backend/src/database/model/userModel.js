import mongoose from "mongoose";
const Schema = mongoose.Schema;

const UserModel = new  Schema({
    
    userId:{
          type:String,
          require:true
    }
    
    
},{timestamps: true})



export default mongoose.model('User', UserModel )