import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const UserModel = new Schema(
    {
        email: {
            type: String,
            require: true,
            unique: true,
        },
        username: {
            type: String,
            require: true,
            unique: true,
        },
        usernameTitle: {
            type: String,
        },
        password: {
            type: String,
            require: true,
        },
        decs: {
            type: String,
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
        accsessToken: {
            type: String,
            default: null,
        },
        resetPassToken: {
            type: String,
            default: null,
        },
        resetPassExpiration: {
            type: String,
            default: null,
        },
        verifyMailCode: {
            type: String,
            default: null,
        },
        verifySuccess: {
            type: Boolean,
            default: false,
        },
        avtImg: {
            type: String,
            default: null,
        },
        avtImgName: {
            type: String,
            default: null,
        },
        groupImg: {
            type: Array,
            default: [],
        },
        groupIcon: {
            type: Array,
            default: [],
        },
        fromGoogle: {
            type: Boolean,
            default: false,
        },

        firstName: {
            type: String,
            default: null,
        },
        lastName: {
            type: String,
            default: null,
        },
        organization: {
            type: String,
            default: null,
        },
        position: {
            type: String,
            default: null,
        },
        emailWork: {
            type: String,
            default: null,
        },
        phone: {
            type: String,
            default: null,
        },
        state: {
            type: String,
            default: null,
        },
        city: {
            type: String,
            default: null,
        },
        street: {
            type: String,
            default: null,
        },
        apartment: {
            type: String,
            default: null,
        },
        country: {
            type: String,
            default: null,
        },
    },
    { timestamps: true },
);

export default mongoose.model('User', UserModel);
