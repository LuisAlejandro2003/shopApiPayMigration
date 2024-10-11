import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { ProductServicePort } from 'src/domain/products/ports/product-service.port';

@Injectable()
export class DeleteProductUseCase {
  constructor(
    @Inject('ProductServicePort') private readonly productService: ProductServicePort,
  ) {}

  async execute(id: string): Promise<void> {
    const product = await this.productService.findById(id);
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    await this.productService.delete(id);
  }
}
