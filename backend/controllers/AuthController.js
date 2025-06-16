const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/User");

const signup = async (request, response) => {
  try {
    const { name, email, password } = request.body;
    const user = await UserModel.findOne({ email });
    if (user) {
      return response.status(409).json({
        message: "User is already exist, you can login",
        success: false,
      });
    }
    const userModel = new UserModel({ name, email, password });
    userModel.password = await bcrypt.hash(password, 10);
    await userModel.save();
    response
      .status(201)
      .json({ message: "signup successfully", success: true });
  } catch (error) {
    response
      .status(500)
      .json({ message: "internal server error", success: false });
  }
};

const login = async (request, response) => {
  try {
    const { email, password } = request.body;
    const user = await UserModel.findOne({ email });
    const errMessage = "Auth failed email or password is wrong";
    if (!user) {
      return response.status(403).json({
        message: errMessage,
        success: false,
      });
    }
    const isPassEqual = await bcrypt.compare(password, user.password);
    if (!isPassEqual) {
      return response.status(403).json({
        message: errMessage,
        success: false,
      });
    }
    const jwtToken = jwt.sign(
      { email: user.email, _id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    response
      .status(200)
      .json({
        message: "signup success",
        success: true,
        jwtToken,
        email,
        name: user.name
      });
  } catch (error) {
    response
      .status(500)
      .json({ message: "internal server error", success: false });
  }
};

module.exports = {
  signup,
  login,
};
