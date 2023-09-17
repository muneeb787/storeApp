import { Router } from "express";
import UserController from "../controllers/user.js";
import userValidator from "../validator/user.js";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

const userRouter = new Router();
userRouter.post("/user", authMiddleware , roleMiddleware, userValidator.create, UserController.create);
userRouter.put("/user/:id", authMiddleware , roleMiddleware, userValidator.update, UserController.update);
userRouter.delete("/user/:id", authMiddleware , roleMiddleware, UserController.delete);
userRouter.get("/user/:id", authMiddleware , roleMiddleware, UserController.getSingle);
userRouter.post("/user/searchAllUser", authMiddleware , roleMiddleware, UserController.searchAlluser);
userRouter.get("/users", authMiddleware , roleMiddleware , UserController.getAll);

export default userRouter;
