import { Router } from "express";
import {orderController} from "../controllers/orderController.js";
import { orderValidator } from "../validator/OrderValidation.js";
import authMiddleware from "../middleware/authMiddleware.js";

const orderRouter = new Router();

orderRouter.post("/order", authMiddleware , orderController.createOrder);
orderRouter.put("/order/:id", orderValidator.update, orderController.updateOrder);
orderRouter.get("/orders", orderController.getAllOrder);
orderRouter.get("/order/:id", orderController.getSingleOrder);
orderRouter.get("/delete/:id", orderController.deleteOrder);

export default orderRouter;