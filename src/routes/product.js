import { Router } from "express";
import productController from "../controllers/product.js";
import productValidator from "../validator/product.js";
const productRouter = new Router();

productRouter.get("/products", productController.getAll);
productRouter.get("/product/:id", productController.getSingle);
productRouter.post("/product",productValidator.create, productController.create);
productRouter.put("/product/:id",productValidator.update, productController.update); 

export default productRouter;
