import { Router } from "express";
import userRouter from "./user.js";
import productRouter from "./product.js";

const mainRouter = new Router();


mainRouter.use(userRouter);
mainRouter.use(productRouter);



export default mainRouter;
