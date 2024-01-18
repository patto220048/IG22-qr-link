import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const LinkModel = new Schema(
    {
        cardId: {
            type: String,
        },
        userId: {
            type: String,
            require: true,
        },
        url: {
            type: String,
            require: true,
        },
        urlTitle: {
            type: String,
            default: "Title",
        },
        acticve: {
            type: Boolean,
            default: false,
        },
        urlThumbnail: {
            type: String,
            default: null,
        },
        thumbnailImage: {
            type: String,
            default: null,
        },
        headerStyle: {
            type: Boolean,
            default: false,
        },
        contactStyle: {
            type: Boolean,
            default: false,
        },
        urlStyle : {
            type: Boolean,
            default: false,
        },
        decs: {
            type: String,
            default: null,
        }
    

    },
    { timestamps: true },
);

export default mongoose.model('LinkModel', LinkModel);
