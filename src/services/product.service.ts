import connection from '../models/connection';
import ProductModel from '../models/product.model';
import IProduct from '../interfaces/product.interface';

export default class ProductService {
  public productModel: ProductModel;

  constructor() {
    this.productModel = new ProductModel(connection);
  }

  public insert = async (product: IProduct): Promise<IProduct> => this.productModel.insert(product);

  public getAll = async (): Promise<IProduct[]> => this.productModel.getAll();
}