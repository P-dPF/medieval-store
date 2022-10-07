import jwt, { JwtPayload } from 'jsonwebtoken';
import { NextFunction, Response } from 'express';
import statusCodes from '../utils/statusCodes';
import errorGenerator from '../utils/errorGenerator';
import IError from '../interfaces/error.interface';
import IRequest from '../interfaces/request.interface';

const validateToken = async (
  req: IRequest,
  res: Response, 
  next: NextFunction,
): Promise<IError | void> => {
  const token = req.header('Authorization');
  if (!token) return next(errorGenerator(statusCodes.UNAUTHORIZED, 'Token not found'));

  try {
    const decoded = jwt.verify(token, 'password');
    
    req.user = decoded as JwtPayload;
    next();
  } catch (error) {
    next(errorGenerator(statusCodes.UNAUTHORIZED, 'Invalid token'));
  }
};

export default validateToken;