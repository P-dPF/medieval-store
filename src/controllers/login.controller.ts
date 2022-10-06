import { NextFunction, Request, Response } from 'express';
import LoginService from '../services/login.service';
import statusCodes from '../utils/statusCodes';
import validateSchema from '../middlewares/validateSchemas';
import loginSchema from '../middlewares/schemas';
import errorGenerator from '../middlewares/errorGenerator';

export default class LoginController {
  constructor(private service = new LoginService()) { }

  public loginHandler = async (req: Request, res: Response, next: NextFunction) => {
    const loginInfo = req.body;

    const loginError = validateSchema(loginSchema, loginInfo);
    if (loginError) return next(errorGenerator(statusCodes.BAD_REQUEST, loginInfo.message));

    const { username, password } = loginInfo;
    const token = await this.service.loginHandler(username, password);
    res.status(statusCodes.OK).json({ token });
  };
}