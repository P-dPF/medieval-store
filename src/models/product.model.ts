import { Pool, ResultSetHeader, RowDataPacket } from 'mysql2/promise';
import Product from '../interfaces/product.interface';

export default class ProductModel {
  public connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public insert = async (product: Product): Promise<Product> => {
    const { name, amount } = product;

    const [{ insertId }] = await this.connection.execute<ResultSetHeader>(
      'INSERT INTO Trybesmith.Products (name, amount) VALUES (?, ?);',
      [name, amount],
    );

    return { id: insertId, ...product };
  };

  public getAll = async (): Promise<Product[]> => {
    const [result] = await this.connection.execute<(Product & RowDataPacket)[]>(
      'SELECT * FROM Trybesmith.Products');

    return result;
  };
}