import express from "express";

import auth from "../controller/authController.js";
import userVerify from '../middleware/verifyToken.js';

const router = express.Router();



router.post('/signup', auth.signUp)
router.post('/login', auth.login)
router.post('/logout', auth.logout)
router.post('/reset-pass',auth.resetPassword)
router.post('/refresh-token', auth.refreshTokenApi)
router.post("/reset-pass/:token", auth.newPassword);

export default router
