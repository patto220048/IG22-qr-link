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
            default:null
        } ,
        button_type: {
            type :String,
            default:null

        }
        ,
        button_color: {
            type :String,
            default:null

        }
        ,
        button_font_color: {
            type :String,
            default:null

        }
        ,
        fonts:{
            type: String,
            default:null

        },
        font_color:{
            type:String,
            default:null

        },
        btn:{
            type:String,
            default:null

        }

        

        
    },
    { timestamps: true },
);

export default mongoose.model('CardModel', CardModel);
