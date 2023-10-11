import User from '../database/model/userModel.js';
import handleError from '../error/handleError.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import transport from '../mail-service/index.js';
import crypto from 'crypto';
import sha256 from 'crypto-js/sha256.js';
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
                    // save user into database
                    const newUser = new User({ ...req.body, password: hash, verifyMailCode: verifyMailCode });
                    await newUser.save();
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
            const refresh_token = generateRefeshToken(currentUser);
            // set refresh token for user
            const setRefreshToken = await User.findByIdAndUpdate(
                currentUser._id,
                {
                    $set: { refreshToken: refresh_token },
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
                                html: `
                                    <div>
                                    <h1>Hello, click button below to reset your password</h1>
                                    <button style="padding: 10px;">
                                      <a
                                        href="http://localhost:3000/api/auth/reset/${token}"
                                        style="text-decoration: none; color: black;"
                                      >
                                        Cick Here
                                      </a>
                                    </button>
                                  </div>
                                    `,
                            });
                            console.log('Send mail successfully!!!');
                        } catch (error) {
                            console.log(error.message);
                        }
                    }

                    res.status(200).json(newUser);
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
                    res.status(200).json(newUser);
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
                    html: `
                        <div>
                        <h1>Hello, click button below to verify your mail</h1>
                        <button style="padding: 10px;">
                          <a
                            href="http://localhost:3000/api/auth/verify?${email}&code=${user.verifyMailCode}"
                            style="text-decoration: none; color: black;"
                          >
                            Cick Here
                          </a>
                        </button>
                      </div>
                        `,
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
            if (user === null) return res.json(handleError(404, 'User not found !'));
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
                    res.status(200).json({newUser, "Status": "Email verify success"});
                } catch (error) {
                    res.json(handleError(500, error.message));
                }
            }
            else{
                return res.json(handleError(403, "Something errors"));
            }
        } catch (error) {
            res.json(handleError(500, error.message));
        }
    }
}
export default new authController();
