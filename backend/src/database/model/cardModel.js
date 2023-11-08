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
        backgroundImg: {
            type: String,
            default: null,
        },
        backgroundColor: {
            type: String,
            default: null,
        },
        backgroundOpacity: {
            type: String,
            default: null,
        },
        backgroundType: {
            type: String,
            default: null,
        },
        btn_type: {
            type: String,
            default: null,
        },
        btn_color: {
            type: String,
            default: null,
        },
        bnt_radius: {
            type: String,
            default: null,
        },
        font_famify: {
            type: String,
            default: null,
        },
        font_color: {
            type: String,
            default: null,
        },
        icons:{
            type: Array,
            default: [],
        }
    },
    { timestamps: true },
);

export default mongoose.model('CardModel', CardModel);
