import express from "express";

import auth from "../controller/authController.js";
const router = express.Router();



router.post('/signup', auth.signUp)

export default router
