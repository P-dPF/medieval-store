import { Request, Response } from 'express';
import LoginService from '../services/login.service';
import statusCodes from '../utils/statusCodes';

export default class LoginController {
  constructor(private service = new LoginService()) { }

  public loginHandler = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    console.log(username, password);

    const token = await this.service.loginHandler(username, password);
    res.status(statusCodes.OK).json({ token });
  };
}