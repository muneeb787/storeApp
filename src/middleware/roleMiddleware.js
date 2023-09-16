import EHttpStatusCode from "../enums/HttpStatusCode.js";
import roles from "../enums/Roles.js";
import env from "dotenv";
env.config();

const roleMiddleware = (req, res, next) => {
  try {
    const { role } = req.user;
    console.log(`logged User Role: ${role}`);
    if (role != roles.Admin) {
      return res
        .status(EHttpStatusCode.FORBIDDEN)
        .json({ message: "Access Forbidden!" });
    } else next();
  } catch (error) {
    console.log(error);
    return res
      .status(EHttpStatusCode.INTERNAL_SERVER)
      .json({ message: "Internal Server Error!" });
  }
};

export default roleMiddleware;
