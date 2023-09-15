import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    default: 0,
  },
  description: {
    type: String,
    required: true,
  },
  reviews: [
    {
      user_id: {
        type: mongoose.Schema.ObjectId,
        ref: "user",
      },
      comment_text: {
        type: String,
        required: true,
      },
      DateTime: {
        type: Date,
        default: Date.now(),
      },
    },
  ],
  rating: [
    {
      user_id: {
        type: mongoose.Schema.ObjectId,
        ref: "user",
      },
      points: {
        type: Number,
        default: 1.0,
        required: true,
      },
      DateTime: {
        type: Date,
        default: Date.now(),
      },
    },
  ],
  catagory_id: {
    type: mongoose.Schema.ObjectId,
    default: null,
    ref: "catagory",
  },
}, {
  timestamps: true,
});

const productModel = mongoose.model("Products", productSchema);

export default productModel;
