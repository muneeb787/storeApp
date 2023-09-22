import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    products: [
      {
        product_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        Order_Quantity: {
          type: Number,
          ref: "Product",
          required: true,
        },
        total_price: {
          type: Number,
          required: true,
        },
      },
    ],
    transaction_id: {
        type: Date,
        default: Date.now,
    },
    total_price:{
      type:Number,
      required:true,
      default:null,
    },
   
    status: {
      type: String,
      enum: ["pending", "shipped", "deliverd", "cancelled"],
      default: "pending",
    },
    shipping_address: {
        street: {
          type:String,
          required:true,
        },
        city: {
          type:String,
          required:true,
        },
        state: {
          type:String,
          required:true,
        },
        postal_code: {
          type:String,
          required:true,
        },
        country: {
          type:String,
          required:true,
        },
    },
  },


  {
    timestamps: {
      created_At: {
        type: Date,
        default: Date.now,
      },
      updated_At: {
        type: Date,
        default: Date.now,
      },
    },
  }
);

// creating a model object
const Order = mongoose.model("Order", orderSchema);
export default Order;
