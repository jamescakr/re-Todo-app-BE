const authController = {};
const jwt = require("jsonwebtoken");
require("dotenv").config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

authController.authenticate = (req, res, next) => {
  try {
    const tokenString = req.headers.authorization;
    if (!tokenString) {
      throw new Error("invalid token1");
    }
    const token = tokenString.replace("Bearer ", "");
    jwt.verify(token, JWT_SECRET_KEY, (error, payload) => {
      if (error) {
        throw new Error("invalid token2");
      }
      console.log("payload??", payload); //
      req.userId = payload._id; //
      next();
    });
  } catch (error) {
    res.status(400).json({ status: "failed", message: error.message });
  }
};

module.exports = authController;
