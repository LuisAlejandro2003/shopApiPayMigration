// src/application/products/use-cases/get-all-products.use-case.ts
import { Injectable, Inject } from '@nestjs/common';
import { ProductServicePort } from 'src/domain/products/ports/product-service.port';
import { Product } from 'src/domain/products/entities/product.entity';

@Injectable()
export class GetAllProductsUseCase {
  constructor(
    @Inject('ProductServicePort') private readonly productService: ProductServicePort,
  ) {}

  async execute(): Promise<Product[]> {
    return this.productService.findAll();
  }
}
