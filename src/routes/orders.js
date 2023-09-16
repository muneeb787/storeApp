import { Router } from "express";
import {orderController} from "../controllers/orderController.js";
import { orderValidator } from "../validator/OrderValidation.js";

const router = new Router();

router.post("/order", orderValidator.create, orderController.createOrder);
router.put("/order/:id", orderValidator.update, orderController.updateOrder);
router.get("/orders", orderController.getAllOrder);
router.get("/order/:id", orderController.getSingleOrder);
router.delete("/delete/:id", orderController.deleteOrder);

export default orderRouter;