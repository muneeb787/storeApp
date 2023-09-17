import { Router } from "express";
import categoryController from "../controllers/category.js";
import categoryValidator from "../validator/category.js";
import authMiddleware from "../middleware/authMiddleware.js";

const categoryRouter = new Router();
categoryRouter.post("/category",authMiddleware, categoryValidator.create, categoryController.create);
categoryRouter.get("/category/:id",authMiddleware, categoryController.delete);
categoryRouter.get("/category" ,authMiddleware, categoryController.getAll);

export default categoryRouter;