import { NextFunction, Request, Response } from 'express';
import statusCodes from '../utils/statusCodes';
import ProductService from '../services/product.service';
import { addProductSchema } from '../validations/schemas';
import IProduct from '../interfaces/product.interface';
import joiInputValidate from '../validations/joi.input.validation';

export default class ProductController {
  constructor(private service = new ProductService()) { }

  public insert = async (req: Request, res: Response, next: NextFunction) => {
    const product = req.body;

    const joiError = joiInputValidate<IProduct>(addProductSchema, product);
    if (joiError) return next(joiError);
    
    const insertedProduct = await this.service.insert(product);
    res.status(statusCodes.CREATED).json(insertedProduct);
  };

  public getAll = async (_req: Request, res: Response) => {
    const productsList = await this.service.getAll();
    res.status(statusCodes.OK).json(productsList);
  };
}