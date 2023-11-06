import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const iconModel = new Schema(
    {
        userId: {
            type: String, 
            require: true, 
        },
        iconName: {
            type: String, 
            require: true, 
        },
        iconUrl: {
            type: String, 
            require: true, 
        }
       
    },
    { timestamps: true },
);

export default mongoose.model('iconMode', iconModel);
