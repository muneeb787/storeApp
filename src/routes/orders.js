import { Router } from "express";
import {orderController} from "../controllers/orderController.js";
import { orderValidator } from "../validator/OrderValidation.js";

const orderRouter = new Router();

orderRouter.post("/order/create", orderValidator.create, orderController.createOrder);
orderRouter.put("/order/update/:id", orderValidator.update, orderController.updateOrder);
orderRouter.get("/order/getAll/:id", orderController.getAllOrder);
orderRouter.delete("/delete/:id", orderController.deleteOrder);

export default orderRouter;