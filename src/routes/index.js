import { Router } from "express";
import userRouter from "./user.js";
import authRouter from "./auth.js";

const mainRouter = new Router();

mainRouter.use(userRouter);
mainRouter.use(authRouter);

export default mainRouter;
