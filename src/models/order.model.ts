import { Pool, ResultSetHeader, RowDataPacket } from 'mysql2/promise';
import IOrder from '../interfaces/order.interface';

export default class OrderModel {
  public connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public getAll = async (): Promise<IOrder[]> => {
    const [result] = await this.connection.execute<(IOrder & RowDataPacket)[]>(
      `SELECT
        o.id,
        o.userId,
        JSON_ARRAYAGG(p.id) AS productsIds
      FROM Trybesmith.Orders AS o
      INNER JOIN Trybesmith.Products AS p
      ON o.id = p.orderId
      GROUP BY o.id;`);
      
    return result;
  };

  public insert = async (order: IOrder, userId: number): Promise<IOrder> => {
    const { productsIds } = order;
    const [{ insertId: newOrder }] = await this.connection.execute<ResultSetHeader>(
      'INSERT INTO Trybesmith.Orders (userId) VALUE (?);',
      [userId],
    );

    const updateProducts = productsIds.map((productId: number) => (
      this.connection.execute<ResultSetHeader>(
        'UPDATE Trybesmith.Products SET orderId = ? WHERE id = ?',
        [newOrder, productId],
      )));

    await Promise.all([newOrder, updateProducts]);

    return { userId, productsIds };
  };
}