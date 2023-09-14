import  router, { Router }  from "express";
import * as orderController from "../controllers/orderController.js";

router.post('/orders', orderController.createOrder);
router.put('/orders/:id', orderController.updateOrder);
router.get('/orders/:id', orderController.getAllOrder);
router.delete('/orders/:id', orderController.deleteOrder);