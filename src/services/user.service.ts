import jwt from 'jsonwebtoken';
import connection from '../models/connection';
import UserModel from '../models/user.model';
import IUser from '../interfaces/user.interface';

export default class UserService {
  public userModel: UserModel;

  constructor() {
    this.userModel = new UserModel(connection);
  }

  public insert = async (user: IUser): Promise<string> => {
    const createdUser = await this.userModel.insert(user);
    const token = this.generateToken(createdUser);
    return token;
  };

  private generateToken = (user: IUser): string => {
    const payload = { id: user.id, name: user.username };
    const token = jwt.sign(payload, 'password');
    return token;
  };
}