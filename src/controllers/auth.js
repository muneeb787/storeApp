import EHttpStatusCode from "../enums/HttpStatusCode.js";
import bycrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../models/user.js";
import env from "dotenv";


const refreshTokens = [];
const authController = {
  //Handler Function to Register
  Register: async (req, res) => {
    try {
      const user = new userModel({
        name: req.body.name,
        email: req.body.email,
        password: bycrypt.hashSync(req.body.password, 10),

      });
      console.log(`User Data ${user}`);
      user.save();
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
           console.log(user);
          const accessToken = jwt.sign(
            { id: user._id },
            process.env.SECRET_KEY,
            {
              expiresIn: 3600, //expires in 1 hours
            }
          );
          console.log(`Access Token ${accessToken}`);
         
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
}


export default authController;
