import express from "express";
import userController from "../controller/userController.js";
import userVerify from "../middleware/verifyToken.js"
const router = express.Router();


//get users
router.get('/', userController.getUsers)
// get user
router.get('/:id', userController.getUser)
// edit user
router.put('/:id', userVerify.verifyUser, userController.editUser)
// delete user
router.delete('/:id', userVerify.verifyUser, userController.deteleUser)

export default router