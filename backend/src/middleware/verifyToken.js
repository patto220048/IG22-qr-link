import jwt from "jsonwebtoken";
import handleError from '../error/handleError.js'
const verifyToken = {
  verifyUser: (req, res, next) => {
    const authHeader = req.headers.authorization || req.cookies.access_token;
    if (authHeader) {
      const token = authHeader.split(" ")[1];
      jwt.verify(token, process.env.JWT_ACCESS_KEY, (err, currentUser) => {
        if (err) return res.json(handleError(401,"Token is invalid!!!"));
        req.user = currentUser;
        next();
      });
    } else res.json(handleError(401,"You are not authenticated!!!"));
  },
};

export default verifyToken;