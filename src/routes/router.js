import express from "express";
import {orderController} from "../controllers/orderController.js";
import { orderValidator } from "../validator/OrderValidation.js";

const router = express.Router();

router.post("/create", orderValidator.create, orderController.createOrder);
router.put("/update/:id", orderValidator.update, orderController.updateOrder);
router.get("/getAll/:id", orderController.getAllOrder);
router.delete("/delete/:id", orderController.deleteOrder);

export const orderRouter = router;