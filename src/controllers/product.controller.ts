import { Request, Response } from 'express';
import statusCodes from '../utils/statusCodes';
import ProductService from '../services/product.service';

export default class ProductController {
  constructor(private productService = new ProductService()) { }

  public insert = async (req: Request, res: Response) => {
    const product = req.body;

    const insertedProduct = await this.productService.insert(product);
    res.status(statusCodes.CREATED).json(insertedProduct);
  };

  public getAll = async (_req: Request, res: Response) => {
    const productsList = await this.productService.getAll();
    res.status(statusCodes.OK).json(productsList);
  };
}