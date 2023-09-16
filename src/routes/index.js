import { Router } from "express";
import userRouter from "./user.js";
import authRouter from "./auth.js";
import orderRouter from "./orders.js";
import productRouter from "./product.js";
const mainRouter = new Router();


mainRouter.use(userRouter);
mainRouter.use(authRouter);
mainRouter.use(orderRouter);
mainRouter.use(productRouter);

export default mainRouter;
