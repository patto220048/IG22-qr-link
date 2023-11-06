import express from 'express';
import icon from '../controller/iconController.js';
import userVerify from '../middleware/verifyToken.js';

const router = express.Router();
//add icon
router.post("/:userId",userVerify.verifyUser,icon.addIcon)
router.get("/",userVerify.verifyUser,icon.getIcon)
router.put("/:id",userVerify.verifyUser,icon.editIcon)
router.delete("/:id",userVerify.verifyUser,icon.deteleIcon)
export default router;
