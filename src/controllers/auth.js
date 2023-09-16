import EHttpStatusCode from "../enums/HttpStatusCode.js";
import bycrypt from "bcrypt";
import userModel from "../models/user.js";
import signUpMail from "../email/auth/signUp.js";
import signInMail from "../email/auth/signIn.js";
const jwt = require("jsonwebtoken");

const refreshTokens = [];

const authController = () => ({
  //Handler Function to Register
  Register: async (req, res) => {
    try {
      //Verifying if the user already exits
      if (
        (user.userName && user.email) === userModel.findOne({ userName, email })
      ) {
        res.status(EHttpStatusCode.BAD_REQUEST).json({
          message: `Already Registered User Email: ${user.email}`,
        });
      } else {
        res
          .status(EHttpStatusCode.SUCCESS)
          .json({ message: `New User: ${user.email}` });
      }
      const user = new userModel({
        userName: req.body.name,
        email: req.body.email,
        password: bycrypt.hashSync(req.body.password, 12),
        role: req.body.role,
        address: req.body.address,
        phoneNumber: req.body.phoneNumber,
      });
      console.log(`User Data ${user}`);
      user.save();
      //Sending a successful registration mail
      signUpMail(userName, email);
      return res
        .status(EHttpStatusCode.SUCCESS)
        .json({ message: "Registration Successful!" });
    } catch (error) {
      console.log(error);
      return res
        .status(EHttpStatusCode.INTERNAL_SERVER)
        .json({ message: "Internal Server Error!" });
    }
  },
  //Handler Function to Login
  Login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await userModel.findOne({ email });
      if (!user) {
        return res
          .status(EHttpStatusCode.NOT_FOUND)
          .json({ message: "User Not Found!" });
      } else {
        const isValidPassword = bycrypt.compare(password, user.password);
        if (!isValidPassword) {
          return res
            .status(EHttpStatusCode.UNAUTHORIZED)
            .json({ message: "Unauthorized, Re-Login!" });
        } else {
          const accessToken = jwt.sign(
            { id: user._id },
            process.env.SECRET_KEY,
            {
              expiresIn: 3600, //expires in 1 hours
            }
          );
          console.log(`Access Token ${accessToken}`);
          //Sending an email on Successful login
          signInMail(user.userName, email);
          const refreshToken = jwt.sign(
            { id: user._id },
            process.env.SECRET_KEY
          );
          console.log(`Refresh Token ${refreshToken}`);

          refreshTokens.push(refreshToken);

          return res.status(EHttpStatusCode.SUCCESS).json({
            message: "User Successfully Logged In!",
            accessToken,
            refreshToken,
          });
        }
      }
      signInMail(userName, email);
    } catch (error) {
      console.log(error);
      return res
        .status(EHttpStatusCode.INTERNAL_SERVER)
        .json({ message: "Internal Server Error!" });
    }
  },
  // Handler Function to Generate Refresh Tokens
  Token: (req, res) => {
    const { token } = req.body;
    console.log(`Token Regenerator: ${token}`);
    if (!token) {
      return res
        .status(EHttpStatusCode.UNAUTHORIZED)
        .json({ message: "Unauthorized, Re-Login!" });
    }
    if (!refreshTokens.includes(token)) {
      return res
        .status(EHttpStatusCode.NOT_FOUND)
        .json({ message: "Token Not Found!" });
    }

    jwt.verify(token, process.env.SECRET_KEY, (error, user) => {
      if (error) {
        return res
          .status(EHttpStatusCode.NOT_FOUND)
          .json({ message: "Token Not Found!" });
      }
      const accessToken = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
        expiresIn: 3600, //expires in 1 hours
      });
      console.log(`Access Token Generated ${accessToken}`);
      return res.status(EHttpStatusCode.SUCCESS).json({
        message: "User Successfully Logged In!",
        accessToken,
      });
    });
  },
  Logout: (req, res) => {
    const { token } = req.body;
    console.log(`Token Logout: ${token}`);
    refreshTokens = refreshTokens.filter((t) => t != token);
    return res.status(EHttpStatusCode.SUCCESS).json({
      message: "User Logged Out!",
      token,
    });
  },
});

export default authController;
