import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const LinkModel = new Schema(
    {
        cardId: {
            type: String, 
            require: true, 
        },
        links:{
            type:Array,
            default:[]
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
