import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import statusCodes from '../utils/statusCodes';
import errorGenerator from '../utils/errorGenerator';
import IError from '../interfaces/error.interface';

const validateToken = async (
  req: Request,
  res: Response, 
  next: NextFunction,
): Promise<IError | void> => {
  const token = req.header('Authorization');
  if (!token) return next(errorGenerator(statusCodes.UNAUTHORIZED, 'Token not found'));

  try {
    const decoded = jwt.verify(token, 'password');
    req.body.user = decoded;
    next();
  } catch (error) {
    next(errorGenerator(statusCodes.UNAUTHORIZED, 'Invalid token'));
  }
};

export default validateToken;