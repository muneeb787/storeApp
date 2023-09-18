import { Router } from "express";
import categoryController from "../controllers/category.js";
import categoryValidator from "../validator/category.js";
import authMiddleware from "../middleware/authMiddleware.js";

const categoryRouter = new Router();
<<<<<<< HEAD
categoryRouter.post("/category", categoryValidator.create, categoryController.create);
categoryRouter.get("/category/:id",authMiddleware, categoryController.delete);
categoryRouter.get("/category", categoryController.getAll);
=======
categoryRouter.post("/category", categoryController.create);
categoryRouter.get("/category/:id", categoryController.delete);
categoryRouter.get("/category" ,authMiddleware, categoryController.getAll);
>>>>>>> 95299ae77e9a12446c2bbe241dba1a4e5c7f879b

export default categoryRouter;