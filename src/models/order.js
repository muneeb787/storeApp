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
      type: String,
    },
    totalPrice: Number,
    status: {
      type: String,
      enum: ["pending", "shipped", "deliverd", "cancelled"],
      default: "pending",
    },
    // shipping_address: {
    //     street: String,
    //     city: String,
    //     state: String,
    //     postal_code: String,
    //     country: String,
    // },
    // billing_info: {
    //     payment_method: String,
    //     credit_card_last4: String,
    //     billing_address: {
    //         street: String,
    //         city: String,
    //         state: String,
    //         postal_code: String,
    //         country: String,
    //     },
    // },
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
