import joi from "joi";

const productValidator = {
  create: (req, res, next) => {
    const schema = joi.object({
      name: joi.string().min(3).max(40).required(),
      price: joi.number().max(100000).required(),
      description: joi.string().min(5).max(500).required(),
      reviews: joi.array().items({
        user_id: joi.string().required(),
        comment_text: joi.string().required().min(5).max(200),
      }),
      rating: joi.array().items({
        user_id: joi.string().required(),
        points: joi.string().required(),
      }),
      category_id: joi.string().required(),
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
      price: joi.number().max(100000).required(),
      description: joi.string().min(5).max(500).required(),
      reviews: joi.array().items({
        user_id: joi.string().required(),
        comment_text: joi.string().required().min(5).max(200),
      }),
      rating: joi.array().items({
        user_id: joi.string().required(),
        points: joi.string().required(),
      }),
      category_id: joi.string().required(),
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
