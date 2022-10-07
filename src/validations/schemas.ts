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