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
        admin: {
            type: Boolean,
            default: false,
        },
        customer: {
            type: Boolean,
            default: false,
        },
        adress: {
            type: String,
        },
        refreshToken: {
            type: String,
            default: null,
        },
        resetPassToken: {
            type: String,
            default: null,
        },
        resetPassExpiration:{
            type: String,
            default: null,
        }
    },
    { timestamps: true },
);

export default mongoose.model('User', UserModel);
