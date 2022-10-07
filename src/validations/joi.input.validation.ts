import { Schema, ValidationError } from 'joi';
import IError from '../interfaces/error.interface';
import errorGenerator from '../utils/errorGenerator';
import statusCodes from '../utils/statusCodes';

enum JoiErrorTypes {
  'any.required' = 1,
  'string.min',
  'string.base',
  'number.min',
  'number.base',
}

const validateSchema = <T>(schema: Schema, data: T): ValidationError | undefined => {
  const { error } = schema.validate(data);

  return error;
};

const joiErrorGenerator = (errorType: string, errorMessage: string): IError => {
  switch (errorType) {
    case JoiErrorTypes[2]:
    case JoiErrorTypes[3]:
    case JoiErrorTypes[4]:
    case JoiErrorTypes[5]:
      return errorGenerator(statusCodes.UNPROCESSABLE_ENTITY, errorMessage);
    default:
      return errorGenerator(statusCodes.BAD_REQUEST, errorMessage);
  }
};

const joiInputValidate = <T>(schema: Schema, data: T) => {
  const hasError = validateSchema<T>(schema, data);
  console.log(hasError);
  if (hasError) return joiErrorGenerator(hasError.details[0].type, hasError.message);

  return hasError;
};

export default joiInputValidate;