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
        backgroundImgName: {
            type: String,
            default: null,
        },
        backgroundVideo: {
            type: String,
            default: null,
        },
        backgroundVideoName: {
            type: String,
            default: null,
        },
        bgColor: {
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
        btn_fontColor: {
            type: String,
            default: null,
        },
        btn_color1: {
            default: null,
            type: String,
        },
        btn_outline: {
            type: Boolean,
            default: false,
        },
        btn_radius: {
            type: Number,
            default: 0,
        },
        btn_border: {
            type: Number,
            default: 0,
        },
        btn_style: {
            btn_shadow: {
                horizontal: {
                    type: Number,
                    default: 0,
                },
                vertical: {
                    type: Number,
                    default: 0,
                },
                blur: {
                    type: Number,
                    default: 0,
                },
                spread: {
                    type: Number,
                    default: 0,
                },
                opacity: {
                    type: Number,
                    default: 0,
                },
                color: {
                    type: String,
                },
            },
        },
        font_famify: {
            type: String,
            default: null,
        },
        font_color: {
            type: String,
            default: null,
        },
        icons: {
            type: Array,
            default: [],
        },
        gadientColorTop: {
            type: String,
            default: null,
        },
        gadientColorBot: {
            type: String,
            default: null,
        },
    },
    { timestamps: true },
);

export default mongoose.model('CardModel', CardModel);
