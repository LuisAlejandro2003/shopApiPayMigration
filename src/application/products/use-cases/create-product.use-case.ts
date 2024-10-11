// src/application/products/use-cases/create-product.use-case.ts
import { Injectable, Inject } from '@nestjs/common';
import { ProductServicePort } from 'src/domain/products/ports/product-service.port';
import { Product } from 'src/domain/products/entities/product.entity';

@Injectable()
export class CreateProductUseCase {
  constructor(
    @Inject('ProductServicePort') private readonly productService: ProductServicePort,
  ) {}

  async execute(data: Partial<Product>): Promise<Product> {
    const product = new Product(data.id, data.name, data.brand, data.category, data.price, data.description);
    return this.productService.create(product);
  }
}
