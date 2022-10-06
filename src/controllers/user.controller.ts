import { Request, Response } from 'express';
import UserService from '../services/user.service';
import statusCodes from '../utils/statusCodes';

export default class UserController {
  constructor(private service = new UserService()) { }

  public insert = async (req: Request, res: Response) => {
    const user = req.body;

    const token = await this.service.insert(user);
    res.status(statusCodes.CREATED).json({ token });
  };
}