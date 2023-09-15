import { Router } from "express";
import UserController from "../controllers/user.js";
import uservalidator from "../validator/user.js";

const userRouter = new Router();
userRouter.post("/user/create",uservalidator.signup, UserController.signup);
userRouter.put("/user/update/:id",uservalidator.update, UserController.update);
userRouter.get("/user/delete/:id",UserController.delete);
userRouter.get("/user/singleuser/:id",UserController.getSingle);
userRouter.post("/user/searchAllUser", UserController.searchAlluser);
userRouter.get("/user/getall", UserController.getAll);

export default userRouter;
