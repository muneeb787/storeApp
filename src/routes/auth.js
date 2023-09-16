import { Router } from "express";
import authController from "../controllers/auth";

const authRouter = new Router();
authRouter.post("/register", authController.Register);
authRouter.post("/login",authController.Login);
authRouter.post("/token",authController.Token);
authRouter.post("/logout",authController.Logout);


export default authRouter;

// Refresh Token and Logout token helpful article
// https://stackabuse.com/authentication-and-authorization-with-jwts-in-express-js/