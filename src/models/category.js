import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: {
    type: "string",
    required: true,
  }
});

// creating a model object
const categoryModel = mongoose.model("category", categorySchema);
export default categoryModel;
