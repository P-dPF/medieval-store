import Joi from 'joi';

const loginSchema = Joi.object().keys({
  username: Joi.string(),
  password: Joi.string(),
});

export default loginSchema;