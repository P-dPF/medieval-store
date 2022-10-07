import { NextFunction, Request, Response } from 'express';
import LoginService from '../services/login.service';
import statusCodes from '../utils/statusCodes';
import { loginSchema } from '../validations/schemas';
import IUser from '../interfaces/user.interface';
import joiInputValidate from '../validations/joi.input.validation';
import errorGenerator from '../utils/errorGenerator';

export default class LoginController {
  constructor(private service = new LoginService()) { }

  public loginHandler = async (req: Request, res: Response, next: NextFunction) => {
    const login = req.body;

    const joiError = joiInputValidate<IUser>(loginSchema, login);
    if (joiError) return next(joiError);

    const token = await this.service.loginHandler(login.username, login.password);
    if (!token) {
      return next(errorGenerator(statusCodes.UNAUTHORIZED, 'Username or password invalid'));
    }
    res.status(statusCodes.OK).json({ token });
  };
}