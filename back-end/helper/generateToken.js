import jwt from 'jsonwebtoken';

const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET_KEY, {
    expiresIn: '30d',
  });

  console.log("token", token)
  console.log("userId", userId)

  res.cookie('jwt', token, {
    httpOnly: true,
    secure:false,
    sameSite: 'strict',
    maxAge: 30 * 24 * 60 * 60 * 1000, 
    domain: 'localhost', 
    path: '/', 
  });
};


export default generateToken;