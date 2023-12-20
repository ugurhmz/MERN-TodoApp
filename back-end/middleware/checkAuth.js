const jwt = require('jsonwebtoken');

exports.checkAuthenticated = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1]

    console.log("token", token)

    if (!token) {
      return res.status(401).json({ error: "Unauthorized access" })
    }

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(403).json({ error: "Token is not valid!" })
      }

      console.log("decoded", decoded)

      req.userId = decoded.userId
      next()
    })
  } catch (error) {
    console.error("Error ", error)
    return res.status(400).json({ error: "Invalid authorization header" })
  }
}
