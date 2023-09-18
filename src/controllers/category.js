import categoryModel from "../models/category.js";
import EHttpStatusCode from "../enums/HttpStatusCode.js";

const categoryController = {

create: async (req, res) => {
    const body = req.body;
    try {
      const category = await categoryModel.create(body);
      return res.status(EHttpStatusCode.SUCCESS).json({ message: "Category Created", category });
    } catch (error) {
      return res.status(EHttpStatusCode.INTERNAL_SERVER).json({ message: "Error creating category" });
    }
  },

  getAll: async (req, res) => {
    try {
      const category = await categoryModel.find();
      if (category.length > 0) {
        return res.json(category);
      } else {
        return res.status(EHttpStatusCode.NOT_FOUND).json({ message: "No data" });
      }
    } catch (error) {
      return res.status(EHttpStatusCode.INTERNAL_SERVER).json({ message: "Error fetching data" });
    }
  },

  delete: async (req, res) => {
    const id=req.params.id;
    const Category=await categoryModel.findOneAndDelete({_id: id});
    return res.status(EHttpStatusCode.SUCCESS).json({ message: "Category deleted successfully",Category });
  },

}

export default categoryController;