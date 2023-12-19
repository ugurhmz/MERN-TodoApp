const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const UserModel = require("../models/UserModel")

// Registration
exports.registerUserController = async (req, res) => {
  try {
    console.log("body",req.body)
    const { userMail, userName, password } = req.body;

    // Check password length
    if (password.length < 6 || password.length > 16) {
        return res.status(400).json({ error: "Password must be between 6 and 16 characters!" });
    }

    // Check if the email is in the correct format
    if (!userMail.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      return res.status(400).json({ error: "Invalid email format!" });
    }

    // Check if the user already exists
    const existingUser = await UserModel.findOne({ userMail });
    if (existingUser) {
      return res.status(409).json({ error: "User with this email already exists!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new UserModel({ userMail, userName, password: hashedPassword });
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
    const { userMail, password } = req.body;

    // Check if the email is in the correct format
    if (!userMail.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      return res.status(400).json({ error: "Invalid email format!" })
    }

    // Check if the user exists
    const user = await UserModel.findOne({ userMail })
    if (!user) {
      return res.status(401).json({ error: "User not found!" })
    }

    // Compare the provided password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, user.password)

    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid password!" })
    }

    // Create a JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' })

    res.status(200).json({
      message: "Login successful /W/",
      user: {
        userId: user._id,
        userName: user.userName,
        userMail: user.userMail,
      },
      token,
    })
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Login failed!" })
  }
}
