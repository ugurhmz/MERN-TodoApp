import httpStatus from 'http-status';
import jwt from 'jsonwebtoken';
import User from '../models/UserModel.js'; 

export const checkAuthenticated = async (req, res, next) => {
  const token = req.cookies.jwt;
  console.log("NEW TOKEN", token);
  console.log("NEW TOKEN2", req.headers.token);
  
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      console.log("decoded.userId", decoded.userId)
      req.userId = decoded.userId
      req.user = await User.findById(decoded.userId).select('-password')
      
      next();
    } catch (err) {
      console.error(err);
      res.status(httpStatus.UNAUTHORIZED).json({ error: "Not authorized, token failed!!" })
    }
  } else {
    res.status(httpStatus.UNAUTHORIZED).json({ error: "Invalid authorization header!!" })
  }
}
