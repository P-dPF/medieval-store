import { NextFunction, Request, Response } from 'express';
import IOrder from '../interfaces/order.interface';
import IError from '../interfaces/error.interface';
import OrderService from '../services/order.service';
import statusCodes from '../utils/statusCodes';
import joiInputValidate from '../validations/joi.input.validation';
import { addOrderSchema } from '../validations/schemas';

export default class OrderController {
  constructor(private service = new OrderService()) { }

  public getAll = async (req: Request, res: Response): Promise<void> => {
    const ordersList = await this.service.getAll();
    res.status(statusCodes.OK).json(ordersList);
  };

  public insert = async (
    req: Request,
    res: Response, 
    next: NextFunction,
  ):Promise<IError | void> => {
    const newOrder = req.body;
    const userId = 3;

    const joiError = joiInputValidate<IOrder>(addOrderSchema, newOrder);
    if (joiError) return next(joiError);
    
    const insertedOrder = await this.service.insert(newOrder, userId);
    res.status(statusCodes.CREATED).json(insertedOrder);
  };
}