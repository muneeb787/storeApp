import { Router } from "express";
import userRouter from "./user.js";
import productRouter from "./product.js";
import { orderRouter } from "./orders.js";

const mainRouter = new Router();


mainRouter.use(userRouter);
mainRouter.use(productRouter);
mainRouter.use(orderRouter);



export default mainRouter;
