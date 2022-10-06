import { Schema, ValidationError } from 'joi';

function validateSchema<T>(schema: Schema, data: T): ValidationError | null {
  const { error } = schema.validate(data);

  if (error) return error;
  return null;
}
export default validateSchema;