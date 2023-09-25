import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const CardModel = new Schema(
    {
        userId: {
            type: String, 
            require: true, 
        },
        link:{
            type: String,
        } ,
        
        background:{
            type: String,
        } ,
        button_type: {
            type :String,
        }
        ,
        fonts:{
            type: String,
        },
        font_color:{
            type:String
        }
    },
    { timestamps: true },
);

export default mongoose.model('CardModel', CardModel);
