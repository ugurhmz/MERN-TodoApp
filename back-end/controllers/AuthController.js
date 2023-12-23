
const jwt = require("jsonwebtoken")
const UserModel = require("../models/UserModel.js")
const nodemailer = require("nodemailer");
const httpStatus = require("http-status")
const CryptoJs = require('crypto-js')

// Registration
exports.registerUserController = async (req, res) => {
  try {
    const { userMail, userName, password } = req.body;

    if (password.length < 6 || password.length > 16) {
      return res.status(400).json({ error: "Password must be between 6 and 16 characters!" });
    }

    if (!userMail.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      return res.status(400).json({ error: "Invalid email format!" });
    }

    const existingUser = await UserModel.findOne({ userMail });
    if (existingUser) {
      return res.status(409).json({ error: "User with this email already exists!" });
    }

    const encryptedPassword = CryptoJs.AES.encrypt(password, process.env.PAS_SECURITY).toString();

    const newUser = new UserModel({ userMail, userName, password: encryptedPassword });
    const savedUser = await newUser.save();

    res.status(201).json(savedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Registration failed !!" });
  }
}

// Login
exports.loginUserController = async (req, res) => {
  try {
    const   password  = req.body.password;
    const userMail   = req.body.userMail
   
     if (!userMail || !password || userMail === '' || password === '') {
    return res.status(400).json({ error: "Empty field! Email and password are required!" });
    }

    if (!userMail.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      return res.status(400).json({ error: "Invalid email format!" });
    }

    const findUser = await UserModel.findOne({ userMail });

    if (!findUser) {
      return res.status(401).json({ error: "User not found!" });
    }

    const decryptUserPassword = CryptoJs.AES.decrypt(findUser.password, process.env.PAS_SECURITY);
    const userDbPassword = decryptUserPassword.toString(CryptoJs.enc.Utf8);


    if (userDbPassword !== req.body.password) {
      return res.status(401).json({ error: "Invalid password!" });
    }

    const token = jwt.sign({ userId: findUser._id }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });

    res.status(200).json({
      message: "Login successful /W/",
      user: {
        userId: findUser._id,
        userName: findUser.userName,
        userMail: findUser.userMail,
      },
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Login failed!" })
  }
}

// FORGET PASSWORD
exports.resetPasswordController = async (req, res) => {
  try {
    const email = req.body.userMail;

    const findUser = await UserModel.findOne({ userMail: email });

    if (!findUser) {
      return res.status(httpStatus.NOT_FOUND).json({
        error: "User not found, try again!",
      });
    }

    // Generate a secure random password
    const newPassword = "ugurcuk6767"
    const resetToken = CryptoJs.lib.WordArray.random(20).toString(CryptoJs.enc.Hex)
    const resetTokenExpiry = Date.now() + 3600000;
    findUser.resetPasswordToken = resetToken;
    findUser.resetPasswordExpiry = resetTokenExpiry;

    await findUser.save();
    const resetLink = `${process.env.FRONTEND_URL}:${process.env.PORT}/ugurv1/api/users/reset-password?token=${resetToken}&newpw=${newPassword}`;

    const emailInfo = {
      from: process.env.EMAIL_FROM,
      to: email,
      subject: "Reset password",
      html: `<h3>Click the following link to reset your password:</h3>
             <p><a href="${resetLink}">${resetLink}</a></p>
             <p>Your new password: ${newPassword}</p>
             <hr/> `,
    };

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_FROM,
        pass: process.env.EMAIL_PW,
      },
    });

    const { password, resetPasswordToken, resetPasswordExpiry, ...exceptThePassword } = findUser._doc;

    transporter
      .sendMail(emailInfo)
      .then((sent) => {
        return res.status(httpStatus.OK).json({
          message: `Password reset link sent to your ${email}.`,
          updatedUser: exceptThePassword,
        });
      })
      .catch((err) => {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
          error: err,
        });
      })
  } catch (err) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json(err)
  }
}

// Reset PW Checker
exports.resetPasswordLinkController = async (req, res) => {
  try {
    const { token, newpw } = req.query
    if (!token) {
      return res.status(httpStatus.BAD_REQUEST).json({ error: "Invalid or expired reset token!" });
    }

    // Kullanıcıyı tokena göre bul
    const findUser = await UserModel.findOne({ resetPasswordToken: token });
  
    if (!findUser) {
      return res.status(httpStatus.NOT_FOUND).json({ error: "User not found or invalid reset token!" });
    }

    if (findUser.resetPasswordExpiry && Date.now() > findUser.resetPasswordExpiry) {
      return res.status(httpStatus.BAD_REQUEST).json({ error: "Reset token has expired!" })
    }

    if (findUser.resetPasswordToken === token) {
      const newPassword = newpw;
      findUser.password = CryptoJs.AES.encrypt(newPassword, process.env.PAS_SECURITY).toString();

      findUser.resetPasswordToken = null
      findUser.resetPasswordExpiry = null

      await findUser.save()
      res.status(httpStatus.OK).json({
        message: "Password reset successful.",
        token, 
      });
    } else {
    
      res.status(httpStatus.BAD_REQUEST).json({ error: "Invalid token." });
    }
  } catch (err) {
    console.error(err);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: "Password reset failed!" });
  }
}

// Logout
exports.logOutController = async (req, res) => {
  const authHeader = req.headers.authorization;
  console.log("headers1",req.headers)

  if (authHeader !== null && authHeader !== undefined) {
    const splitToken = authHeader.split(" ")[1];

    try {
      const decodedToken = jwt.verify(splitToken, process.env.JWT_SECRET_KEY);
      const userId = decodedToken.userId;
     
      res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0),
      });

      console.log("headers2",req.headers)
      res.status(httpStatus.OK).json({ message: "Logout successful" });
    } catch (err) {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: err });
    }
  } else {
    return res.status(httpStatus.UNAUTHORIZED).json({ error: "Authorization fail!" });
  }
};
