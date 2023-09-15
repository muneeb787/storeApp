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
      required: true,
    },
    address: {
      house:{
        type:"string",
        required:true,
      },
      street: {
        type: "string",
        required: true,
      },
      city: {
        type: "string",
        required: true,
      },
      country:{
        type:"string",
        required:true,
      },
      postal_code:{
        type:"number",
        required:true,
      }
    },
    number: {
      type: "number",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.model("user", userSchema);

export default userModel;