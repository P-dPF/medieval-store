import { NextFunction, Request, Response } from 'express';
import IError from '../interfaces/error.interface';

const errorHandler = (error: IError, req: Request, res: Response, _next: NextFunction) => {
  const { status, message } = error;

  res.status(status).json({ message });
};

export default errorHandler;