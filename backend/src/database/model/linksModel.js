import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const LinkModel = new Schema(
    {
        cardId: {
            type: String, 
            require: true, 
        },
        userId: {
            type: String, 
            require: true,
        },
        link:{
            type:String,
            require: true, 
            
        },
        title:{
            type: String,

        },
        icon:{
            type: String,
        }
    
    },
    { timestamps: true },
);

export default mongoose.model('LinkModel', LinkModel);
