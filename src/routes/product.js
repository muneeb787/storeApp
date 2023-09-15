import { Router } from "express";
import productController from "../controllers/product.js";


const productRouter = new Router();

productRouter.get("/products", productController.getall);
productRouter.get("/product/:id", productController.getSingle);

productRouter.post("/product", productController.create);
productRouter.put("/product", productController.update);

export default productRouter;
