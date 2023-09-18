import { Router } from "express";
import categoryController from "../controllers/category.js";
import categoryValidator from "../validator/category.js";
import authMiddleware from "../middleware/authMiddleware.js";

const categoryRouter = new Router();
categoryRouter.post("/category", categoryValidator.create, categoryController.create);
categoryRouter.delete("/category/:id", categoryController.delete);
categoryRouter.get("/category", categoryController.getAll);

export default categoryRouter;