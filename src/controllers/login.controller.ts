import { NextFunction, Request, Response } from 'express';
import LoginService from '../services/login.service';
import statusCodes from '../utils/statusCodes';
import validateSchema from '../validations/validateSchemas';
import loginSchema from '../validations/schemas';
import errorGenerator from '../utils/errorGenerator';
import IUser from '../interfaces/user.interface';

export default class LoginController {
  constructor(private service = new LoginService()) { }

  public loginHandler = async (req: Request, res: Response, next: NextFunction) => {
    const login = req.body;

    const error = validateSchema<IUser>(loginSchema, login);
    
    if (error) return next(errorGenerator(statusCodes.BAD_REQUEST, error.message));

    const token = await this.service.loginHandler(login.username, login.password);
    if (!token) {
      return res.status(statusCodes.UNAUTHORIZED).json({ message: 'Username or password invalid' });
    }
    res.status(statusCodes.OK).json({ token });
  };
}