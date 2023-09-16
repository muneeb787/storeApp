import { Router } from "express";
import UserController from "../controllers/user.js";
import userValidator from "../validator/user.js";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

const userRouter = new Router();
userRouter.post("/user", userValidator.create, UserController.create);
userRouter.put("/user/:id", userValidator.update, UserController.update);
userRouter.delete("/user/:id", UserController.delete);
userRouter.get("/user/:id", UserController.getSingle);
userRouter.post("/user/searchAllUser", UserController.searchAlluser);
userRouter.get("/users", authMiddleware , roleMiddleware , UserController.getAll);

export default userRouter;
