import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const imgModel = new Schema(
    {
        userId: {
            type: String, 
            require: true, 
        },
        imgUrl: {
            type: String, 
            require: true, 
        },
       
    },
    { timestamps: true },
);

export default mongoose.model('imgModel', imgModel);
