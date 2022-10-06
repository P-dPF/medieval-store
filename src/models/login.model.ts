import { Pool, RowDataPacket } from 'mysql2/promise';
import IUser from '../interfaces/user.interface';

export default class LoginModel {
  public connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public loginHandler = async (username:string, password: string): Promise<IUser> => {
    const [[user]] = await this.connection.execute<(
    IUser & RowDataPacket)[]>(
      'SELECT * FROM Trybesmith.Users WHERE username = ? AND password = ?;',
      [username, password],
      );

    return user;
  };
}