import { Product } from '../domain/entities/product.entity';

export interface ProductService {
  createProduct(data: Partial<Product>): Promise<Product>;
  updateProduct(id: string, data: Partial<Product>): Promise<Product>;
  deleteProduct(id: string): Promise<void>;
  getProductById(id: string): Promise<Product | null>;
  listProducts(): Promise<Product[]>;
}
