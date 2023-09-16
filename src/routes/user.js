import { Router } from "express";
import UserController from "../controllers/user.js";
import uservalidator from "../validator/user.js";

const userRouter = new Router();
userRouter.post("/user", uservalidator.signup, UserController.create);
userRouter.put("/user/:id", uservalidator.update, UserController.update);
userRouter.delete("/user/:id", UserController.delete);
userRouter.get("/user/:id", UserController.getSingle);
userRouter.post("/user/searchAllUser", UserController.searchAlluser);
userRouter.get("/users", UserController.getAll);

export default userRouter;
