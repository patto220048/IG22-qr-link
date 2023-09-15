import User from '../database/model/userModel.js';
import handleError from '../error/handleError.js';

class authController {
    async signUp(req, res) {
        const newUser = new User({ ...req.body });
        newUser.save();
        res.status(200).json(newUser);
    }
    async login(req, res) {
        try {
            const currentUser = await User.findOne({ email: req.body.email });
            if (!currentUser) res.json(handleError(401, 'User not found !!!'));
            res.status(200).json(currentUser); 
        } catch (error) 
        {
            res.json(handleError(500, 'Server error!!!'))
        }
    }
}
export default new authController();
