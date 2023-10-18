import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const UserModel = new Schema(
    {
        email: {
            type: String,
            require: true,
            unique : true,
        },
        username: {
            type: String,
            require: true,
            unique : true,
        },
        usernameTitle:{
            type: String,

        },
        password: {
            type: String,
            require: true,
        },
        decs:{
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
        resetPassToken: {
            type: String,
            default: null,
        },
        resetPassExpiration:{
            type: String,
            default: null,
        },
        verifyMailCode:{
            type: String,
            default: null
        },
        verifySuccess:{
            type: Boolean,
            default: false
        },
        avtImg:{
            type: String,
            default: null
        },
        groupImg:{
            type: Array,
            default:[]
        }
        
    },
    { timestamps: true },
);

export default mongoose.model('User', UserModel);
