import { Request, Response } from 'express';
import ProductService from '../services/product.service';
import statusCodes from '../utils/statusCodes';

export default class UserController {
  constructor(private productService = new ProductService()) { }

  public insert = async (req: Request, res: Response) => {
    const user = req.body;

    const insertedUserToken = await this.productService.insert(user);
    res.status(statusCodes.CREATED).json(insertedUserToken);
  };
}