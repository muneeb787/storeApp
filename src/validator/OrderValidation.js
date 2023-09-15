import Joi from 'joi';
// defining a schema for validation

export const orderCreationValidation = Joi.object({
    userId: Joi.string().required(),
    productId: Joi.string().required(),
    quantity: Joi.number().integer().min(1).required(),
    totalPrice: Joi.number().min(0).required(),
    transactionId: Joi.number().min(4).required(),
});

