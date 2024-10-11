import { Product } from '../entities/product.entity';

export interface ProductServicePort {
  create(product: Product): Promise<Product>;
  findAll(): Promise<Product[]>;
  findById(id: string): Promise<Product | null>;
  update(id: string, product: Product): Promise<Product>;
  delete(id: string): Promise<void>;
}
