import { Schema, ValidationError } from 'joi';

function validateSchema<T>(schema: Schema, data: T): ValidationError | undefined {
  const { error } = schema.validate(data);

  return error;
}
export default validateSchema;