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
productRouter.get("/getall/:pagesize:limit",productController.getAllpages)
productRouter.get("/product/:id", productController.getSingle);
<<<<<<< HEAD
productRouter.post("/product", upload.single('image') , productValidator.create , productController.create);
productRouter.put("/product/:id",productValidator.update, productController.update); 
 
=======
productRouter.post("/product", productController.create);
productRouter.put("/product/:id", productController.update); 
>>>>>>> 95299ae77e9a12446c2bbe241dba1a4e5c7f879b

export default productRouter;
