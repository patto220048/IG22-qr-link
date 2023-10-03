import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ThemeModel = new Schema(
    {
        cardId: {
            type: String,
            require,
        },
        link: {
            type: String,
            require,
        },
    },
    { timestamps: true },
);

export default mongoose.model('CardModel', ThemeModel);
