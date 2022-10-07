import { Request, Response } from 'express';
import OrderService from '../services/order.service';
import statusCodes from '../utils/statusCodes';

export default class OrderController {
  constructor(private service = new OrderService()) { }

  public getAll = async (req: Request, res: Response) => {
    const ordersList = await this.service.getAll();
    res.status(statusCodes.OK).json(ordersList);
  };

  public insert = async (req: Request, res: Response) => {
    const newOrder = req.body;
    const userId = 1;
    
    const insertedOrder = await this.service.insert(newOrder, userId);
    res.status(statusCodes.CREATED).json(insertedOrder);
  };
}