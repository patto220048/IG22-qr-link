import User from '../database/model/userModel.js';
import handleError from '../error/handleError.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'


const generateAccessToken = (user) => {
    return jwt.sign(
      { id: user._id},
      process.env.JWT_ACCESS_KEY,
      { expiresIn: "3h" }
    );
  };
class authController {
    
    async signUp(req, res) {
        try {
            // check user already existed
            const userEmail = await User.findOne({ email: req.body.email });
            const userName = await User.findOne({ username: req.body.username });
            if (!userEmail && !userName) {
                // hash password
                const salt = bcrypt.genSaltSync(10);
                const hash = bcrypt.hashSync(req.body.password, salt);
                // save user into database
                const newUser = new User({ ...req.body, password: hash });
                await newUser.save();
                return res.status(200).json(newUser);
            } else {
                return res.json(handleError(402, 'Username or email has already existed !'));
            }
        } catch (error) {
            res.json(handleError(500, error.message));
        }
    }
    async login(req, res) {
        try {
            // check user in database 
            const currentUser = await User.findOne({ email: req.body.email }); 
            if (!currentUser) return res.json(handleError(401, 'User not found !!!'));
            // compare hash password
            const isCorrectPassword = bcrypt.compare(req.body.password, currentUser.password);
            if (!isCorrectPassword) {
                return res.json(handleError(403, 'INVALID PASSWORD !'));
            }

            //sign jwt for user
            const accsessToken = generateAccessToken(currentUser)
            const {password, ...other} = currentUser._doc
            // set cookie
            res
            .cookie('access_token', accsessToken,{
                httpOnly: true,
                path: '/',
            })
            .status(200)
            .json({...other,accsessToken});

        } catch (error) {
            res.json(handleError(500, error.message));
        }
    }
    async resetPassword(req, res) {
        
    }

}
export default new authController();
