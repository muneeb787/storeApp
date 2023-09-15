import joi from "joi";

const uservalidator = {
  signup: (req, res, next) => {
    const schema = joi.object({
      name: joi.string().min(3).max(40).required(),
      email: joi.string().email().required(),
      password: joi.string().min(6).required(),
      role: joi.string().required(),
      address: joi.object({
        street: joi.string().required().min(3),
        city: joi.string().required().min(3),
      }),
      number: joi.string().length(11).pattern(/^[0-9]+$/).required(),
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
      email: joi.string().email().required(),
      address: joi.object({
        street: joi.string().required(),
        city: joi.string().required(),
      }),
      number: joi.string().length(11).pattern(/^[0-9]+$/).required(),
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
export default uservalidator;
