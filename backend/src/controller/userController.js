import User from '../database/model/userModel.js';
import handleError from '../error/handleError.js';
import bcrypt from 'bcryptjs';
class UserController {
    //get all user
    async getUsers(req, res) {
        try {
            const users = await User.find();
            res.status(200).json(users);
        } catch (error) {
            res.json(handleError(500, error.message));
        }
    }
    //get 1 user
    async getUser(req, res) {
        const userId = req.params.id;
        try {
            const user = await User.findById(userId);
            res.status(200).json(user);
        } catch (error) {
            res.json(handleError(500, error.message));
        }
    }
    // edit user
    async editUser(req, res) {
        const userId = req.params.id;
        if (userId === req.user.id) {
            // hash password again
            if (req.body.password) {
                const salt =  await bcrypt.genSalt(10);
                req.body.password = await  bcrypt.hash(req.body.password, salt);
            }
            try {
                const newUser = await User.findByIdAndUpdate(
                    userId,
                    {
                        $set: req.body,
                    },
                    { new: true },
                );
                res.status(200).json(newUser);
            } catch (error) {
                res.json(handleError(500, error.message));
            }
        }
        else {
            res.json(handleError(403, "Oop!!! You just edit only your account."))
        }
    }
    // delete user
    async deteleUser(req, res) {
        const userId = req.params.id;
        if (userId === req.user.id) {
            try {
                await User.findByIdAndDelete(userId)
                res.status(200).json("Delete successfuly!!")
            } catch (error) {
                res.json(handleError(500, error.message));
            }
            
        }
        else {
            res.json(handleError(403, "Oop!!! You just delete only your account."))
        }
    }
}
export default new UserController();
