import { Router } from "express";
import authRouter from "./auth";

const mainRouter = new Router();

mainRouter.use(authRouter);

export default mainRouter;