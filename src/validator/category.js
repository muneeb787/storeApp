import Joi from "joi";
import EHttpStatusCode from "../enums/HttpStatusCode.js";

const categoryValidator = {
  create: async (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string().min(3).max(30).required("Required"),
    });
    const { error } = schema.validate(req.body);
    if (error) {
      return res
        .status(EHttpStatusCode.BAD_REQUEST)
        .json({ message: error.details[0].message });
    }
    next();
    },
    
};

export default categoryValidator;
