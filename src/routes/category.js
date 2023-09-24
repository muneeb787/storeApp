import { Router } from "express";
import categoryController from "../controllers/category.js";
import categoryValidator from "../validator/category.js";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

const categoryRouter = new Router();
categoryRouter.post("/category",authMiddleware,roleMiddleware, categoryValidator.create, categoryController.create);
categoryRouter.delete("/category/:id",authMiddleware,roleMiddleware, categoryController.delete);
categoryRouter.get("/category", categoryController.getAll);

export default categoryRouter;