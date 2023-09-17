import { Router } from "express";
import userRouter from "./user.js";
import authRouter from "./auth.js";
import orderRouter from "./orders.js";
import productRouter from "./product.js";
import categoryRouter from "./category.js";

const mainRouter = new Router();

mainRouter.use(authRouter);
mainRouter.use(userRouter);
mainRouter.use(orderRouter);
mainRouter.use(productRouter);
mainRouter.use(categoryRouter);

export default mainRouter;
