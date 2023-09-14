import EHttpStatusCode from "../enums/HttpStatusCode.js";

const jwt = require("jsonwebtoken");

import env from "dotenv";
env.config();

const authMiddleware = (req, res, next) => {
  try {
    //request processing pipline
    let token = req.headers.authorization;
    if (token) {
      token = token.split(" ")[1];
      let user = jwt.verify(token, process.env.SECRET_KEY, {});
      req.userID = user._id;
      res
        .status(EHttpStatusCode.SUCCESS)
        .json({ message: "User Authorizated!" });
    } else {
      res
        .status(EHttpStatusCode.UNAUTHORIZED)
        .json({ message: "Not Authorizated!" });
    }
    next();
  } catch (error) {
    console.log(error);
    res
      .status(EHttpStatusCode.INTERNAL_SERVER)
      .json({ message: "Internal Server Error!" });
  }
};

export default authMiddleware;