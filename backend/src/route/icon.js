import express from 'express';
import icon from '../controller/iconController.js';
import userVerify from '../middleware/verifyToken.js';

const router = express.Router();
//add icon
router.post("/:userId",userVerify.verifyUser,icon.addIcon)
export default router;
