import { Router } from "express";
import UserController from "../controllers/user.js";
import uservalidator from "../validator/user.js";

const userRouter = new Router();
userRouter.post("/signup",uservalidator.signup, UserController.signup);
userRouter.put("/update/:id",uservalidator.update, UserController.update);
userRouter.get("/delete/:id",UserController.delete);
userRouter.get("/singleuser/:id",UserController.getSingle);
userRouter.post("/searchAllUser", UserController.searchAlluser);
userRouter.get("/getall", UserController.getAll);

export default userRouter;
