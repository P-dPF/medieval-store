interface IError extends Omit<Error, 'name'> {
  status: number;
}

export default IError;