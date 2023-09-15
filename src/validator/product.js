import joi from "joi";

const productValidator = {
  create: (req, res, next) => {
    const schema = joi.object({
      name: joi.string().min(3).max(40).required(),
      description: joi.string().min(5).max(500).required(),
      price:joi.number().max(100000).required(),
      quantity:joi.number().max(20),
      category:joi.string().required().min(3).max(10),

    });
    const validate = schema.validate(req.body);
    // console.log(validate);
    if (validate.error) {
      return res
        .status(400)
        .json({ message: validate.error.details[0].message });
    }
    next();
  },

  update: (req, res, next) => {
    const schema = joi.object({
        name: joi.string().min(3).max(40).required(),
        description: joi.string().min(5).max(500).required(),
        price:joi.number().max(100000).required(),
        quantity:joi.number().max(20),
        category:joi.string().required().min(3).max(10),
    });
    const validate = schema.validate(req.body);
    // console.log(validate);
    if (validate.error) {
      return res
        .status(400)
        .json({ message: validate.error.details[0].message });
    }
    next();
  },
};
export default productValidator;
