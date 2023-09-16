import EHttpStatusCode from "../enums/HttpStatusCode.js";
import bcrypt from "bcrypt";
import userModel from "../models/user.js";
import signUpMail from "../email/auth/signUp.js";
import signInMail from "../email/auth/signIn.js";
import jwt from "jsonwebtoken";

const refreshTokens = [];

const authController = {
  //Handler Function to Register
  Register: async (req, res) => {
    try {
      const { email } = req.body;
      const checkUser = await userModel.findOne({ email });
      if (checkUser) {
        return res
          .status(EHttpStatusCode.BAD_REQUEST)
          .json({ message: "This Email is already Registered" });
      }
      const user = new userModel({
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 12),
      });
      console.log(`User Data ${user}`);
      user.save();
      //Sending a successful registration mail
      signUpMail(user.name, user.email);
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
      console.log(`User Credential for login: ${user}`);
      if (!user) {
        return res
          .status(EHttpStatusCode.NOT_FOUND)
          .json({ message: "User Not Found!" });
      } else {
        const isValidPassword = bcrypt.compare(password, user.password);
        if (!isValidPassword) {
          return res
            .status(EHttpStatusCode.BAD_REQUEST)
            .json({ message: "Wrong Password, Enter Password Again" });
        } else {
          const userWithoutPassword = { ...user._doc };
          delete userWithoutPassword.password;

          const accessToken = jwt.sign(userWithoutPassword, process.env.SECRET_KEY, {
            expiresIn: 3600, // expires in 1 hour
          });
          console.log(`Access Token ${accessToken}`);

          // Sending an email on Successful login
          signInMail(user.name, user.email);
          const refreshToken = jwt.sign(
            userWithoutPassword,
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
  //handler fucntion for logout
  Logout: (req, res) => {
    const { token } = req.body;
    console.log(`Token Logout: ${token}`);
    refreshTokens = refreshTokens.filter((t) => t != token);
    return res.status(EHttpStatusCode.SUCCESS).json({
      message: "User Logged Out!",
      token,
    });
  },
};

export default authController;
