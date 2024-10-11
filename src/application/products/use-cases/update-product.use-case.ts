import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { ProductServicePort } from 'src/domain/products/ports/product-service.port';
import { Product } from 'src/domain/products/entities/product.entity';

@Injectable()
export class UpdateProductUseCase {
  constructor(
    @Inject('ProductServicePort') private readonly productService: ProductServicePort,
  ) {}

  async execute(id: string, updatedData: Partial<Product>): Promise<Product> {
    const existingProduct = await this.productService.findById(id);
    if (!existingProduct) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    const updatedProduct = new Product(
      id,
      updatedData.name || existingProduct.name,
      updatedData.brand || existingProduct.brand,
      updatedData.category || existingProduct.category,
      updatedData.price !== undefined ? updatedData.price : existingProduct.price,
      updatedData.description || existingProduct.description,
    );

    return this.productService.update(id, updatedProduct);
  }
}
