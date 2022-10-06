import { Schema, ValidationError } from 'joi';

function validateSchema(schema: Schema, data: unknown): ValidationError | undefined {
  const { error } = schema.validate(data);

  return error;
}
export default validateSchema;