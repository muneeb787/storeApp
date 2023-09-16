import EHttpStatusCode from "../enums/HttpStatusCode.js";
import jwt from "jsonwebtoken"


import env from "dotenv";
env.config();

const authMiddleware = (req, res, next) => {
  try {
    //request processing pipline
    let token = req.headers.authorization;
    console.log(token);
    if (!token) {
      return res
        .status(EHttpStatusCode.UNAUTHORIZED)
        .json({ message: "Not Authorized!" });
    } else if (token) {
      token = token.split(" ")[1];
      let user = jwt.verify(token, process.env.SECRET_KEY, {});
      req.user = user;
      return res
        .status(EHttpStatusCode.SUCCESS)
        .json({ message: "User Authorized!" });
    } else next();
  } catch (error) {
    console.log(error);
    return res
      .status(EHttpStatusCode.INTERNAL_SERVER)
      .json({ message: "Internal Server Error!" });
  }
};

export default authMiddleware;
