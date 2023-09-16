import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: "string",
      required: true,
    },
    email: {
      type: "string",
      required: true,
    },
    password: {
      type: "string",
      required: true,
    },
    role: {
      type: "string",
    },
    address: {
      house:{
        type:"string",
      },
      street: {
        type: "string",
      },
      city: {
        type: "string",
      },
      country:{
        type:"string",
      },
      postal_code:{
        type:"number",
      }
    },
    number: {
      type: "number",
    },
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.model("user", userSchema);

export default userModel;
