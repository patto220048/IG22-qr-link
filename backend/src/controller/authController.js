import User from '../database/model/userModel.js';
import handleError from '../error/handleError.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import transport from '../mail-service/index.js';

const generateAccessToken = (user) => {
    return jwt.sign({ id: user._id, admin: user.admin, customer: user.customer }, process.env.JWT_ACCESS_KEY, {
        expiresIn: '10s',
    });
};
const generateRefeshToken = (user) => {
    return jwt.sign({ id: user._id, admin: user.admin, customer: user.customer }, process.env.JWT_REFRESH_KEY, {
        expiresIn: '365d',
    });
};
class authController {
    async signUp(req, res) {
        try {
            // check user already existed
            const userEmail = await User.findOne({ email: req.body.email });
            const userName = await User.findOne({ username: req.body.username });
            if (!userEmail && !userName) {
                // hash password
                const salt = await bcrypt.genSaltSync(10);
                const hash = await bcrypt.hashSync(req.body.password, salt);
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
            const isCorrectPassword = await bcrypt.compare(req.body.password, currentUser.password);
            if (!isCorrectPassword) {
                return res.json(handleError(403, 'INVALID PASSWORD !'));
            }

            //sign jwt for user
            const accsessToken = generateAccessToken(currentUser);
            const refresh_token = generateRefeshToken(currentUser);
            // set refresh token for user
            const setRefreshToken = await User.findByIdAndUpdate(
                currentUser._id,
                {
                    $set: { refreshToken: refresh_token },
                },
                { new: true },
            );
            const { password, ...other } = setRefreshToken._doc;
            // set cookie
            res.cookie('access_token', 'Bearer ' + accsessToken, {
                httpOnly: true,
                path: '/',
            })
                .status(200)
                .json({ ...other, accsessToken });
        } catch (error) {
            res.json(handleError(500, error.message));
        }
    }
    async logout(req, res) {
        const refreshToken = req.body.token;
        // const currentUser = req.body.id;
        // find user from refreshToken
        try {
            const user = await User.findOneAndUpdate(
                { refreshToken: refreshToken },
                {
                    $set: { refreshToken: null },
                },
                { new: true },
            );
            // user not have -> token invalid!!
            if (user != null) {
                res.clearCookie('access_token').status(200).json('Logged out successfully !!');
            } else {
                res.json(handleError(404, 'Token not valid !!'));
            }
        } catch (error) {
            res.json(handleError(500, error.message));
        }
    }
    async refreshTokenApi(req, res) {
        const refreshToken = req.body.token;
        if (!refreshToken) return res.json(handleError(401, 'You are not authenticated!'));
        // TODO: find user form refresh token
        try {
            const userRefresh = await User.findOne({ refreshToken: refreshToken });
            if (!userRefresh) {
                return res.json(handleError('Refresh token not valid!!'));
            }
            // verify refreshToken and create new access token, refresh token
            jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, async (err, user) => {
                if (err) return res.json(handleError(402, err.message));
                const newAccessToken = generateAccessToken(userRefresh);
                const newRefreshToken = generateRefeshToken(userRefresh);
                // assign new AccessToken and refreshToken in db
                try {
                    await User.findByIdAndUpdate(
                        userRefresh._id,
                        {
                            $set: { refreshToken: newRefreshToken },
                        },
                        { new: true },
                    );
                    return res.status(200).json({
                        access_token: newAccessToken,
                        refresh_token: newRefreshToken,
                    });
                } catch (error) {
                    res.json(handleError(500, error.message));
                }
            });
        } catch (error) {
            res.json(handleError(500, error.message));
        }
    }

    async resetPassword(req, res) {}
}
export default new authController();
