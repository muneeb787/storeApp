import { Router } from "express";
import UserController from "../controllers/user.js";
import uservalidator from "../validator/user.js";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

const userRouter = new Router();
userRouter.post("/user/create",authMiddleware,roleMiddleware,uservalidator.signup, UserController.create);
userRouter.put("/user/update/:id",authMiddleware,roleMiddleware,uservalidator.update, UserController.update);
userRouter.get("/user/delete/:id",authMiddleware,roleMiddleware,UserController.delete);
userRouter.get("/user/singleuser/:id",authMiddleware,roleMiddleware,UserController.getSingle);
userRouter.post("/user/searchAllUser",authMiddleware,roleMiddleware, UserController.searchAlluser);
userRouter.get("/user/getall",authMiddleware,roleMiddleware, UserController.getAll);

export default userRouter;
