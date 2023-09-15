import  router  from "express";
import * as orderController from "../controllers/orderController.js";

export const orderRouter = () => {
router.post('/orders', orderController.createOrder);
router.put('/orders/:id', orderController.updateOrder);
router.get('/orders/:id', orderController.getAllOrder);
router.delete('/orders/:id', orderController.deleteOrder);
};