import { Request, Response } from 'express';
import OrderService from '../services/order.service';
import statusCodes from '../utils/statusCodes';

export default class OrderController {
  constructor(private service = new OrderService()) { }

  public getAll = async (req: Request, res: Response) => {
    const ordersList = await this.service.getAll();
    res.status(statusCodes.OK).json(ordersList);
  };
}