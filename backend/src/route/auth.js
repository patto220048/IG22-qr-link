import express from "express";

import auth from "../controller/authController.js";
import userVerify from '../middleware/verifyToken.js';

const router = express.Router();



router.post('/signup', auth.signUp)
router.post('/login', auth.login)
router.post('/logout', auth.logout)
router.post('/reset',auth.resetPassword)
router.post('/refresh-token', userVerify.verifyUser, auth.refreshTokenApi)


export default router
