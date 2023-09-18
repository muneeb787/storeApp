import { Router } from "express";
import productController from "../controllers/product.js";
import productValidator from "../validator/product.js";
import multer from "multer";

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
productRouter.get("/product/:id", productController.getSingle);
productRouter.post("/product", upload.single('image') , productValidator.create , productController.create);
productRouter.put("/product/:id",productValidator.update, productController.update); 
 

export default productRouter;
