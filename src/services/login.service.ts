import jwt from 'jsonwebtoken';
import connection from '../models/connection';
import LoginModel from '../models/login.model';
import IUser from '../interfaces/user.interface';

export default class LoginService {
  public model: LoginModel;

  constructor() {
    this.model = new LoginModel(connection);
  }

  public loginHandler = async (username: string, password: string): Promise<string | null> => {
    const loggedUser = await this.model.loginHandler(username, password);
    if (!loggedUser) return null;

    const token = this.generateToken(loggedUser);
    return token;
  };

  private generateToken = (user: IUser): string => {
    const payload = { id: user.id, name: user.username };
    const token = jwt.sign(payload, 'password');
    return token;
  };
}