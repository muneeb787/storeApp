import productModel from "../models/products.js";
import EHttpStatusCode from "../enums/HttpStatusCode.js";

const productController = {

  getAll: async (req, res) => {
    try {
      const products = await productModel.find();
      if (products.length > 0) {
        return res.json(products);
      } else {
        return res.status(EHttpStatusCode.NOT_FOUND).json({ message: "No data" });
      }
    } catch (error) {
      return res.status(EHttpStatusCode.INTERNAL_SERVER).json({ message: "Error fetching data" });
    }
  },

  getAllByCategory: async (req, res) => {
    try {
      const {category } = req.params;
      const products = await productModel.find({catagory_id: category});
      if (products.length > 0) {
        const count = products.length;
        return res.json({products , count});
      } else {
        return res.status(EHttpStatusCode.NOT_FOUND).json({ message: "No data" });
      }
    } catch (error) {
      return res.status(EHttpStatusCode.INTERNAL_SERVER).json({ message: "Error fetching data" });
    }
  },
  
  getAllpages: async (req, res) => {
    const { page, limit } = req.params; // Change "pagesize" to "page"
    try {
      const currentPage = parseInt(page) || 1; // Parse the page query parameter

      const skip = (currentPage - 1) * limit; // Calculate the number of documents to skip

      const products = await productModel
        .find()
        .limit(parseInt(limit))
        .skip(skip)
        .exec();

        console.log(products)

      const count = await productModel.countDocuments();
      const totalPages = Math.ceil(count / parseInt(limit));

      res.status(EHttpStatusCode.SUCCESS).json({
        products,
        totalPages,
        currentPage,
      });
    } catch (err) {
      console.error(err.message);
      res.status(EHttpStatusCode.ERROR).json({ error: err.message });
    }
  },
  getAllByCategoryPages: async (req, res) => {
    const { category , page, limit } = req.params; // Change "pagesize" to "page"

    try {
      const currentPage = parseInt(page) || 1; // Parse the page query parameter

      const skip = (currentPage - 1) * limit; // Calculate the number of documents to skip

      const products = await productModel
        .find({catagory_id: category})
        .limit(parseInt(limit))
        .skip(skip)
        .exec();

        console.log(products)

      const count = await productModel.countDocuments();
      const totalPages = Math.ceil(count / parseInt(limit));

      res.status(EHttpStatusCode.SUCCESS).json({
        products,
        totalPages,
        currentPage,
      });
    } catch (err) {
      res.status(EHttpStatusCode.INTERNAL_SERVER).json({message: "Error fetching data"});
    }
  },

  getSingle: async (req, res) => {
    const id = req.params.id;
    try {
      const product = await productModel.findById(id);
      if (product) {
        return res.json(product);
      } else {
        return res.status(EHttpStatusCode.NOT_FOUND).json({ message: "No Data Found" });
      }
    } catch (error) {
      return res.status(EHttpStatusCode.INTERNAL_SERVER).json({ message: "Error fetching data" });
    }
  },
  create: async (req, res) => {
    const body = req.body;
    const file = req.file;
    console.log(body, "body")
    console.log(file, "file")
    try {
      const product = await productModel.create({
        name: body.name,
        description: body.description,
        price: body.price,
        catagory_id: body.catagory_id,
        image: file.filename
      });
      return res.status(EHttpStatusCode.CREATED).json({ message: "Product Created", product });
    } catch (error) {
      return res.status(EHttpStatusCode.INTERNAL_SERVER).json({ message: "Error creating product" });
    }
  },

  update: async (req, res) => {
    const body = req.body;
    const id = req.params.id;
    const product = await productModel.findById(id);
    if (!product) {
      return res.status(EHttpStatusCode.NOT_FOUND).json({ message: "Product not found" });
    }
    product.name = body.name;
    product.price = body.price;
    product.description = body.description;
    await product.save();
    return res.status(EHttpStatusCode.SUCCESS).json({ message: "Product updated successfully", product });
  },

  delete: async (req, res) => {
    const id = req.params.id;
    const product = await productModel.findById(id);
    if (!product) {
      return res.status(EHttpStatusCode.NOT_FOUND).json({ message: "Product not found" });
    }
    const Product = await productModel.deleteOne({ _id: id });
    return res.status(EHttpStatusCode.NO_CONTENT).json({ message: "Product deleted successfully", Product });
  },

};

export default productController;
