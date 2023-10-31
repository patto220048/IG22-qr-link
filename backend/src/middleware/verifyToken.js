import jwt from 'jsonwebtoken';
import handleError from '../error/handleError.js';
const verifyToken = {
    verifyUser: (req, res, next) => {
        // const authHeader = req.headers.authorization || req.cookies.access_token;
        const authHeader = req.cookies.access_token;
        if (authHeader) {
            const token = authHeader.split(' ')[1];
            jwt.verify(token, process.env.JWT_ACCESS_KEY, (err, currentUser) => {
                if (err) return res.json(handleError(401, err.message));
                req.user = currentUser;
                next();
            });
        } else res.json(handleError(401, 'You are not authenticated!!!'));
    },
    verifyAdmin: (req, res, next) => {
        verifyToken.verifyUser(req, res, () => {
            if (req.user.admin) {
                next();
            } else res.status(403).json('You are not admin');
        });
    },
};

export default verifyToken;
