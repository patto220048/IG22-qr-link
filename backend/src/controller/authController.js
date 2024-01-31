import User from '../database/model/userModel.js';
import handleError from '../error/handleError.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import transport from '../mail-service/index.js';
import crypto from 'crypto';
import sha256 from 'crypto-js/sha256.js';
import verifyHtml from '../mail-service/mail-html/verify-html.js';
import verifyPassHtml from '../mail-service/mail-html/resetpass-html.js';
import Card from '../database/model/cardModel.js';
import { v4 as uuidv4 } from 'uuid';
const generateAccessToken = (user) => {
    return jwt.sign({ id: user._id, admin: user.admin, customer: user.customer }, process.env.JWT_ACCESS_KEY, {
        expiresIn: '5h',
    });
};
const generateRefeshToken = (user) => {
    return jwt.sign({ id: user._id, admin: user.admin, customer: user.customer }, process.env.JWT_REFRESH_KEY, {
        expiresIn: '365d',
    });
};
const generateString = uuidv4()
class authController {
    async signUp(req, res) {
        crypto.randomBytes(64, async (err, buffer) => {
            if (err) return res.json(handleError(501, err.message));
            const verifyMailCode = buffer.toString('hex');
            try {
                // check user already existed
                const userEmail = await User.findOne({ email: req.body.email });
                const userName = await User.findOne({ username: req.body.username });
                if (!userEmail && !userName) {
                    // hash password
                    const salt = await bcrypt.genSaltSync(10);
                    const hash = await bcrypt.hashSync(req.body.password, salt);
                    //create card for user

                    // save user into database
                    const newUser = new User({ ...req.body, password: hash, verifyMailCode: verifyMailCode });
                    await newUser.save();
                    const newCard = new Card({ ...req.body, userId: newUser._id });
                    await newCard.save();
                    return res.status(200).json(newUser);
                } else {
                    return res.json(handleError(402, 'Username or email has already existed !'));
                }
            } catch (error) {
                res.json(handleError(500, error.message));
            }
        });
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
            const refreshToken = generateRefeshToken(currentUser);
            // set refresh token for user
            const setRefreshToken = await User.findByIdAndUpdate(
                currentUser._id,
                {
                    $set: { refreshToken: refreshToken, accsessToken: accsessToken },
                },
                { new: true },
            );
            // try {
            //    transport.sendMail({
            //         from: "info@library-v1.online", // sender address
            //         to: currentUser.email, // list of receivers
            //         subject: "Hello ✔",
            //    })
            //    console.log("Send mail successfully!!!")
            // } catch (error) {
            //     console.log(error.message);
            // }
            const { password, ...other } = setRefreshToken._doc;
            // set cookie
            res.cookie('access_token', 'Bearer ' + accsessToken, {
                httpOnly: true,
                path: '/',
            })
                .status(200)
                .json({ ...other });
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
                    const newUser = await User.findByIdAndUpdate(
                        userRefresh._id,
                        {
                            $set: { refreshToken: newRefreshToken, accsessToken: newAccessToken },
                        },
                        { new: true },
                    );
                    const { password, ...other } = newUser._doc;

                    return res.status(200).json({
                        other,
                        accessToken: newAccessToken,
                        refreshToken: newRefreshToken,
                    });
                } catch (error) {
                    res.json(handleError(500, error.message));
                }
            });
        } catch (error) {
            res.json(handleError(500, error.message));
        }
    }

    async resetPassword(req, res) {
        const userEmail = req.body.email;
        crypto.randomBytes(64, async (err, buffer) => {
            if (err) return res.json(handleError(501, err.message));
            const token = buffer.toString('hex');
            try {
                const user = await User.findOne({ email: userEmail });
                if (user === null) return res.json(handleError(404, 'User not found !'));
                try {
                    const newUser = await User.findByIdAndUpdate(
                        user._id,
                        {
                            resetPassToken: token,
                            resetPassExpiration: Date.now() + 3600,
                        },
                        { new: true },
                    );
                    //send mail to user
                    if (newUser) {
                        try {
                            transport.sendMail({
                                from: 'info@library-v1.online', // sender address
                                to: newUser.email, // list of receivers
                                subject: 'Reset password',
                                html: verifyPassHtml(token),
                            });
                            console.log('Send mail successfully!!!');
                        } catch (error) {
                            console.log(error.message);
                        }
                    }
                    const { password, ...other } = newUser._doc;
                    res.status(200).json({ status:200, Message: 'Send mail reset passwrod successfull' });
                } catch (error) {
                    res.json(handleError(500, error.message));
                }
            } catch (error) {
                res.json(handleError(500, error.message));
            }
        });
    }
    async newPassword(req, res) {
        const resetPassToken = req.params.token;
        try {
            const user = await User.findOne({ resetPassToken: resetPassToken });
            const timeExpiration = user.resetPassExpiration <= Date.now();
            if (!user) return res.json(handleError(404, 'User not found !'));
            if (timeExpiration) {
                const salt = await bcrypt.genSaltSync(10);
                const hashPass = await bcrypt.hashSync(req.body.password, salt);
                try {
                    const newUser = await User.findOneAndUpdate(
                        user._id,
                        {
                            password: hashPass,
                            resetPassToken: null,
                            resetPassExpiration: null,
                        },
                        { new: true },
                    );
                    const { password, ...other } = newUser;

                    res.status(200).json(other);
                } catch (error) {
                    res.json(handleError(500, error.message));
                }
            }
        } catch (error) {
            res.json(handleError(500, error.message));
        }
    }
    async sendVerifyEmail(req, res) {
        const email = req.body.email;
        try {
            const user = await User.findOne({ email: email });
            if (user === null) return res.json(handleError(404, 'User not found !'));
            try {
                transport.sendMail({
                    from: 'info@library-v1.online', // sender address
                    to: email, // list of receivers
                    subject: 'Verify mail',
                    html: verifyHtml(email, user.verifyMailCode),
                });
                res.status(200).json({ user, mess: 'Send verify mail successful!' });
            } catch (error) {
                res.json(handleError(500, error.message));
            }
        } catch (error) {
            res.json(handleError(500, error.message));
        }
    }
    async verifyEmail(req, res) {
        const userEmail = req.query.email;
        const code = req.query.code;
        try {
            const user = await User.findOne({ email: userEmail });
            if (user === null) return res.json(handleError(404, 'User not found!'));
            if (user.verifyMailCode === code) {
                try {
                    const newUser = await User.findByIdAndUpdate(
                        user._id,
                        {
                            verifySuccess: true,
                            verifyMailCode: null,
                        },
                        { new: true },
                    );

                    res.status(200).json({ newUser, Status: 'Email verify success' });
                } catch (error) {
                    res.json(handleError(500, error.message));
                }
            } else {
                return res.json(handleError(403, 'Your mail verifyed'));
            }
        } catch (error) {
            res.json(handleError(500, error.message));
        }
    }
    async loginWithGoogle(req, res, next) {
        try {
            const user = await User.findOne({ email: req.body.email });

            if (user) {
                const accessToken = generateAccessToken(user);
                const { password, ...other } = user._doc;

                res.cookie('access_token', 'Bearer ' + accessToken, {
                    httpOnly: true,
                    path: '/',
                })
                    .status(200)
                    .json({ ...other });
            }
            else{
                //generate password
                const passwordGenerate = generateString
                //hash password
                const salt = await bcrypt.genSaltSync(10);
                const hash = await bcrypt.hashSync(passwordGenerate, salt);
                // create new user
                const newUser = new User({...req.body, fromGoogle:true, password:hash })
                await newUser.save()
                // create new card
                const newCard = new Card({ ...req.body, userId: newUser._id });
                await newCard.save();
                const accessToken = generateAccessToken(newUser);
                // create cookie
                const { password,verifyMailCode, ...other } = newUser._doc;

                res.cookie('access_token', 'Bearer ' + accessToken, {
                    httpOnly: true,
                    path: '/',
                    
                })
                    .status(200)
                    .json(newUser)
            }
        } catch (error) {
           next(error)
        }
    }
}
export default new authController();
