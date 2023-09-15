import Joi from "joi";

// defining a schema for validation
export const orderValidator = {
  create: async (req, res, next) => {
    const schema = Joi.object({
      user_id: Joi.string().length(24).hex().required(),
      product_id: Joi.string().length(24).hex().required(),
      transaction_id: Joi.string().required(),
    });
    const { error} = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    next();
  },
  update: async (req, res, next) => {
    const schema = Joi.object({
      user_id: Joi.string().required(),
      product_id: Joi.string().length(24).hex().required(),
      transaction_id: Joi.string().required(),
    });
    const { error} = schema.validate(req.body);
    if(error) {
        return res.status(400).json({ message: error.details[0].message});
    }
    next();
  },
 

};
