import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { ProductServicePort } from 'src/domain/products/ports/product-service.port';
import { Product } from 'src/domain/products/entities/product.entity';

@Injectable()
export class GetProductByIdUseCase {
  constructor(
    @Inject('ProductServicePort') private readonly productService: ProductServicePort,
  ) {}

  async execute(id: string): Promise<Product> {
    const product = await this.productService.findById(id);
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }
}
