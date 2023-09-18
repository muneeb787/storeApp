import { Router } from "express";
import productController from "../controllers/product.js";
import productValidator from "../validator/product.js";

const productRouter = new Router();

productRouter.get("/products", productController.getAll);
productRouter.get("/product/:id", productController.getSingle);
productRouter.post("/product", productController.create);
productRouter.put("/product/:id", productController.update); 

export default productRouter;
