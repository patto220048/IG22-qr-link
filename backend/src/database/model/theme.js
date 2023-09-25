import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const CardModel = new Schema(
    {
        theme: {
            background_img: {
                type: String,
            },
            btn_color: {
                type: String,
            }
        },

    },
    { timestamps: true },
);

export default mongoose.model('template', CardModel);
