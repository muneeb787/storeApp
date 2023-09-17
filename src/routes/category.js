import { Router } from "express";
import categoryController from "../controllers/category.js";
import categoryValidator from "../validator/category.js";

const categoryRouter = new Router();
categoryRouter.post("/category", categoryValidator.create, categoryController.create);
categoryRouter.get("/category/:id", categoryController.delete);
categoryRouter.get("/category" , categoryController.getAll);

export default categoryRouter;