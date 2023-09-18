import productModel from "../models/products.js";

const productController = {
  getAll: async (req, res) => {
    try {
      const products = await productModel.find();
      if (products.length > 0) {
        return res.json(products);
      } else {
        return res.status(404).json({ message: "No data" });
      }
    } catch (error) {
      return res.status(500).json({ message: "Error fetching data" });
    }
  },
  getSingle: async (req, res) => {
    const id = req.params.id; 
    try {
      const product = await productModel.findById(id);
      if (product) {
        return res.json(product);
      } else {
        return res.status(404).json({ message: "No Data Found" });
      }
    } catch (error) {
      return res.status(500).json({ message: "Error fetching data" });
    }
  },
  create: async (req, res) => {
    const body = req.body;
    const file = req.file;
    console.log(body,"body")
    console.log(file,"file")
    try {
      const product = await productModel.create({
        name: body.name,
        description: body.description,
        price: body.price,
        catagory_id: body.catagory_id,
        image: file.filename
      });
      return res.json({ message: "Product Created", product });
    } catch (error) {
      return res.status(500).json({ message: "Error creating product" });
    }
  },
  update: async (req, res) => {
    const { id } = req.params;
    try {
      const product = await productModel.findByIdAndUpdate(id, req.body, { new: true });
      if (product) {
        console.log("Status Updated");
        return res.json(product);
      } else {
        return res.status(404).json({ message: `Product with ID '${id}' not found.` });
      }
    } catch (error) {
      return res.status(500).json({ message: "Error updating product" });
    }
  },

  delete: async (req, res) => {
    const id=req.params.id;
    const product = await categoryModel.findById(id);
    if (!product) {
      return res.status(EHttpStatusCode.NOT_FOUND).json({ message: "Product not found" });
    }
    const Product=await productModel.deleteOne({_id: id});
    return res.status(EHttpStatusCode.SUCCESS).json({ message: "product deleted successfully",Product });
  },

};

export default productController;
