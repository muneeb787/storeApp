import userModel from "../models/user.js";
import bcryptjs from "bcryptjs";
import EHttpStatusCode from "../enums/HttpStatusCode.js";

const UserController = {

    searchAlluser: async (req, res) => {
    const search = req.body.search;
    const { page = 1, limit = 5 } = req.query;
    try {
      const usersearch = await userModel.find({
        $or: [
          { name: { $regex: search, $options: 'i' } },
          { email: { $regex: search, $options: 'i' } }
        ]
      }).limit(limit * 1).skip((page - 1) * limit).exec();
      console.log(usersearch);
      const count = await userModel.countDocuments({
        $or: [
          { name: { $regex: search, $options: 'i' } },
          { email: { $regex: search, $options: 'i' } }
        ]
      });
  
      const totalPages = Math.ceil(count / limit);
      return res.json({usersearch,totalPages,currentPage: page});
    } catch (error) {
      console.error(error);
    }
  },

  getAll: async (req, res) => {
    const { page = 1, limit = 5 } = req.query;
  
    try {
      const users = await userModel.find().limit(limit * 1).skip((page - 1) * limit).exec(); 
      const count = await userModel.countDocuments();
      const totalPages = Math.ceil(count / limit);
      res.status(EHttpStatusCode.SUCCESS).json({users,totalPages, currentPage: page});
    } catch (err) {
      console.error(err.message);
    }
  },
  
  getSingle: async (req, res) => {
    const { id } = req.params;
    const user = await userModel.findById(id);
    if (!user) {
      return res.status(EHttpStatusCode.NOT_FOUND).json({ message: "User not found" });
    }
    return res.status(EHttpStatusCode.SUCCESS).json(user);
  },

  create: async (req, res) => {
    const user=req.body;
    const Password= await bcryptjs.hash(user.password,12);
    user.password=Password
    const User = await userModel.create(user);
    return res.status(EHttpStatusCode.CREATED).json({ message: "User created successfully", User });
   
  },

  update: async (req, res) => {
    const body = req.body;
    const id = req.params.id;
    const user = await userModel.findById(id);
    if (!user) {
      return res.status(EHttpStatusCode.NOT_FOUND).json({ message: "User not found" });
    }
    user.name = body.name;
    user.email = body.email;
    user.address.house=body.address.house;
    user.address.street=body.address.street;
    user.address.city=body.address.city;
    user.address.country=user.address.country;
    user.address.postal_code=user.address.postal_code;
    user.number=body.number;
    await user.save();
    return res.status(EHttpStatusCode.SUCCESS).json({ message: "User Updated successfully", user });
  },

  delete: async (req, res) => {
    const id=req.params.id;
    const user = await userModel.findById(id);
    if (!user) {
      return res.status(EHttpStatusCode.NOT_FOUND).json({ message: "User not found" });
    }
    const Delete=await userModel.deleteOne({_id: id});
    return res.status(EHttpStatusCode.SUCCESS).json({ message: "user deleted successfully",Delete });
  },
  
};

export default UserController;
