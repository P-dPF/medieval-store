import IOrder from '../interfaces/order.interface';
import connection from '../models/connection';
import OrderModel from '../models/order.model';

export default class OrderService {
  public model: OrderModel;

  constructor() {
    this.model = new OrderModel(connection);
  }

  public getAll = async (): Promise<IOrder[]> => this.model.getAll();

  public insert = async (order: IOrder, userId: number): Promise<IOrder> => {
    const newOrderId = await this.model.insertOrder(userId);
    const productsIds = await this.model.updateProducts(order, newOrderId);
    return { userId, productsIds };
  };
}