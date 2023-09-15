import Joi from "joi";

// defining a schema for validation
export const orderValidator = {
  create: async (req, res, next) => {
    const schema = Joi.object({
      user_id: Joi.string().length(24).hex().required(),
      products: Joi.array()
        .items(
          Joi.object({
            product_id: Joi.string().length(24).hex().required(),
            Order_Quantity: Joi.number().required(),
            total_price: Joi.number().required(),
          })
        )
        .required(),
      transaction_id: Joi.string().required(),
      totalPrice: Joi.number().required(),
      status: Joi.string()
        .valid("pending", "shipped", "delivered", "cancelled")
        .default("pending"),
    });
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    next();
  },
  update: async (req, res, next) => {
    const schema = Joi.object({
      user_id: Joi.string().length(24).hex().required(),
      products: Joi.array()
        .items(
          Joi.object({
            product_id: Joi.string().length(24).hex().required(),
            Order_Quantity: Joi.number().required(),
            total_price: Joi.number().required(),
          })
        )
        .required(),
      transaction_id: Joi.string().required(),
      totalPrice: Joi.number().required(),
      status: Joi.string()
        .valid("pending", "shipped", "delivered", "cancelled")
        .default("pending"),
    });
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    next();
  },
};
