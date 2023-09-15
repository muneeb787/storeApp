import mongoose from "mongoose";

const productSchema=new mongoose.Schema({
    name:{
        type:"string",
        required: true
      },
    image: {
        type: "string",
        required: true
      },
    price: {
        type: "number",
        default: 0
    },
    description: {
        type: "string",
        required: true,
    },
    reviews:[
        {
          comment_text: {
            type: "string",
            required: true,
          },
          DateTime: {
            type: Date,
            default: Date.now()
          }
        }
      ],
      rating:[
        {
          user_id:{
            type: mongoose.Schema.ObjectId,
            default: 0,
            ref:"user"
          },
          DateTime: {
            type: Date,
            default: Date.now()
          }
        }
    ],
    catagory_id:{
        type: mongoose.Schema.ObjectId,
        default: 0,
        ref:"catagory"
    },
},
{
    timestamps: true
})

const productModel = mongoose.model("", productSchema);

export default productModel;



