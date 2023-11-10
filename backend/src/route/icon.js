import express from 'express';
import icon from '../controller/iconController.js';
import userVerify from '../middleware/verifyToken.js';

const router = express.Router();
//add icon
router.post("/:userId",userVerify.verifyUser,icon.addIcon)
router.get("/:userId",icon.getIcon)
router.get("/v1/:id",userVerify.verifyUser,icon.getIconbyId)
router.put("/:id",userVerify.verifyUser,icon.editIcon)
router.delete("/:id",userVerify.verifyUser,icon.deteleIcon)
router.delete("/",userVerify.verifyUser,icon.deteleAllIcon)
export default router;
