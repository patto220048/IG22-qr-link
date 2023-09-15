import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const UserModel = new Schema(
    {
        email: {
            type: String,
            require: true,
        },
        username: {
            type: String,
            require: true,
        },
        password: {
            type: String,
            require: true,
        },
    },
    { timestamps: true },
);

export default mongoose.model('User', UserModel);
