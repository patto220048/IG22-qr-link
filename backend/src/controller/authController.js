
import User from "../database/model/userModel.js";
import handleError from "../error/handleError.js";


class authController {

    async signUp(req, res) {
        const newUser = new User({...req.body})
        newUser.save()
        res.status(200).json(newUser)
    }
    
}
export default new authController();