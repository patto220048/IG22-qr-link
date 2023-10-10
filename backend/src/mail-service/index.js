import nodemailer from 'nodemailer';
import * as dotenv from 'dotenv';
dotenv.config();
const transport = nodemailer.createTransport({
    host: process.env.HOST_MAIL,
    port: process.env.PORT_MAIL,
    // secure: true, // true for 465, false for other ports
    auth: {
        user: process.env.USER_MAIL, // generated ethereal user
        pass: process.env.PASS_MAIL, // generated ethereal password
    },
});

export default transport;
