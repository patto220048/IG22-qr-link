import express from "express";
import userController from "../controller/userController.js";
import userVerify from "../middleware/verifyToken.js"
const router = express.Router();


//get users
router.get('/', userController.getUsers)
// get user
router.get('/:username', userController.getUser)
router.get('/v1/:id', userController.getUserById)
// edit user
router.put('/:id', userVerify.verifyUser, userController.editUser)
// delete user
router.delete('/:id', userVerify.verifyUser,userVerify.verifyAdmin, userController.deteleUser)
// delete all user
router.delete('/', userController.deteleAllUser)

export default router
