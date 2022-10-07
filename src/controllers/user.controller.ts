import { NextFunction, Request, Response } from 'express';
import IUser from '../interfaces/user.interface';
import UserService from '../services/user.service';
import statusCodes from '../utils/statusCodes';
import joiInputValidate from '../validations/joi.input.validation';
import { addNewUserSchema } from '../validations/schemas';

export default class UserController {
  constructor(private service = new UserService()) { }

  public insert = async (req: Request, res: Response, next: NextFunction) => {
    const user = req.body;

    const joiError = joiInputValidate<IUser>(addNewUserSchema, user);
    if (joiError) return next(joiError);

    const token = await this.service.insert(user);
    res.status(statusCodes.CREATED).json({ token });
  };
}