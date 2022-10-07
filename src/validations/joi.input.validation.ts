import { Schema, ValidationError } from 'joi';
import IError from '../interfaces/error.interface';
import errorGenerator from '../utils/errorGenerator';
import statusCodes from '../utils/statusCodes';

enum JoiErrorTypes {
  'any.required' = 1,
  'string.min',
  'string.base',
}

const validateSchema = <T>(schema: Schema, data: T): ValidationError | undefined => {
  const { error } = schema.validate(data);

  return error;
};

const joiErrorGenerator = (errorType: string, errorMessage: string): IError => {
  if (errorType === JoiErrorTypes[2] || errorType === JoiErrorTypes[3]) {
    return errorGenerator(statusCodes.UNPROCESSABLE_ENTITY, errorMessage);
  }
  
  return errorGenerator(statusCodes.BAD_REQUEST, errorMessage);
};

const joiInputValidate = <T>(schema: Schema, data: T) => {
  const hasError = validateSchema<T>(schema, data);
  if (hasError) return joiErrorGenerator(hasError.details[0].type, hasError.message);

  return hasError;
};

export default joiInputValidate;