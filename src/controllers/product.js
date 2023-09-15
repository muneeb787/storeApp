
import productModel from "../models/products.js"

const productController = {
  getall: async (req, res) => {
    const body = req.body;
    const get = await Model.find()
    if (get) {
      return res.json(get)
    } else {
      return res.status(404).json({ massage: "No data" })
    }
  },
  getSingle: async (req, res) => {
    const id = req.param.id;
    const product = await productModel.findById(id)
    if (user) {
      return res.json(product)
    } else {
      return res.status(404).json({ massege: "No Data Found" })
    }
  },
  create: async (req, res) => {
    const body = req.body;
    const product = await productModel.create(body)
    return res.json({ massege: "product Created", products: product })
  },
  update: async (req, res) => {
    const { id } = req.params;
    const product = await productModel.findByIdAndUpdate(id, req.body)
    if (product == null) {
      return res.status(404).json({ message: `User with ID '${id}' not found.` });
    } else {
      console.log("Status Upadated")
      return res.json(product)

    }
  },

}
export default productController;