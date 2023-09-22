import { Router } from "express";
import {orderController} from "../controllers/orderController.js";
import { orderValidator } from "../validator/OrderValidation.js";
import authMiddleware from "../middleware/authMiddleware.js";

const orderRouter = new Router();

orderRouter.post("/order", authMiddleware, orderValidator.create, orderController.createOrder);
orderRouter.put("/order/:id",authMiddleware, orderValidator.update, orderController.updateOrder);
orderRouter.get("/orders",authMiddleware, orderController.getAllOrder);
orderRouter.get("/order/:id",authMiddleware, orderController.getSingleOrder);
orderRouter.get("/delete/:id",authMiddleware, orderController.deleteOrder);

export default orderRouter;