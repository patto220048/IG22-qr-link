import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const CardModel = new Schema(
    {
        userId: {
            type: String, 
        },
        themeId: {
            type: String, 
            
        },      
        backgroundImg:{
            type: String,
        } ,
        button_type: {
            type :String,
        }
        ,
        button_color: {
            type :String,
        }
        ,
        button_font_color: {
            type :String,
        }
        ,
        fonts:{
            type: String,
        },
        font_color:{
            type:String
        },
        btn:{
            type:String
        }

        

        
    },
    { timestamps: true },
);

export default mongoose.model('CardModel', CardModel);
