
import { Product } from '../entities/product.entity';

export interface ProductServicePort {
  findAll(query: any, page: number, limit: number): Promise<any>;
  findOne(id: string): Promise<Product>;
  create(product: Product): Promise<Product>;
  update(id: string, product: Product): Promise<Product>;
  remove(id: string): Promise<void>;
  findByBrand(brand: string): Promise<Product[]>;
  findByCategory(category: string): Promise<Product[]>;
  findByPriceRange(min: number, max: number): Promise<Product[]>;
}
