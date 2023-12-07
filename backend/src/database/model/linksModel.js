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
        url:{
            type:String,
            require: true, 
            
        },  
        urlTitle:{
            type: String,
            default:null

        },
        acticve:{
            type: Boolean,
            default: false,
        },
        linkThumbnail:{
            type: String,
            default:null

        }
    
    },
    { timestamps: true },
);

export default mongoose.model('LinkModel', LinkModel);
