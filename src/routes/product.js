import { Router } from "express";
import productController from "../controllers/product.js";
import productValidator from "../validator/product.js";
import authController from "../controllers/auth.js";
import roleMiddleware from "../middleware/roleMiddleware.js";
import multer from "multer";
import authMiddleware from "../middleware/authMiddleware.js";

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, "./images"); // Remove the 'return' statement.
    },
    filename: function (req, file, callback) {
        callback(null, `${Date.now()}_${file.originalname}`); // Remove the 'return' statement.
    }
});


const upload = multer({ storage: storage });

const productRouter = new Router();

productRouter.get("/products", productController.getAll);
productRouter.get("/products/:category", productController.getAllByCategory);
productRouter.get("/products/:page/:limit",productController.getAllpages)
productRouter.get("/products/:category/:page/:limit", productController.getAllByCategoryPages);
productRouter.get("/product/:id", productController.getSingle);
productRouter.post("/product",authMiddleware,roleMiddleware, upload.single('image') , productValidator.create , productController.create);
productRouter.put("/product/:id",authMiddleware, roleMiddleware ,productValidator.update, productController.update); 
productRouter.delete("/product/:id",authMiddleware, roleMiddleware , productController.delete); 
 

export default productRouter;
