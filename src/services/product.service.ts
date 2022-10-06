import connection from '../models/connection';
import ProductModel from '../models/product.model';
import IProduct from '../interfaces/product.interface';

export default class ProductService {
  public model: ProductModel;

  constructor() {
    this.model = new ProductModel(connection);
  }

  public insert = async (product: IProduct): Promise<IProduct> => this.model.insert(product);

  public getAll = async (): Promise<IProduct[]> => this.model.getAll();
}