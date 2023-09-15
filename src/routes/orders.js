import express from "express";
import {orderController} from "../controllers/orderController.js";
import { orderValidator } from "../validator/OrderValidation.js";

const router = express.Router();

router.post("/order/create", orderValidator.create, orderController.createOrder);
router.put("/order/update/:id", orderValidator.update, orderController.updateOrder);
router.get("/order/getAll/:id", orderController.getAllOrder);
router.delete("/delete/:id", orderController.deleteOrder);

export const orderRouter = router;