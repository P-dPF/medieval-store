import Joi from 'joi';

export const loginSchema = Joi.object().keys({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

export const addProductSchema = Joi.object().keys({
  name: Joi.string().min(3).required(),
  amount: Joi.string().min(3).required(),
});

export const addNewUserSchema = Joi.object().keys({
  username: Joi.string().min(3).required(),
  classe: Joi.string().min(3).required(),
  level: Joi.number().min(1).required(),
  password: Joi.string().min(8).required(),
});

export const addOrderSchema = Joi.object().keys({
  productsIds: Joi.array().required().items(
    Joi.number(),
  ).min(1)
    .messages({
      'array.min': '"productsIds" must include only numbers',
      'number.base': '"productsIds" must include only numbers',
    }),
});