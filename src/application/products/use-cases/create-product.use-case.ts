import { Injectable, Inject } from '@nestjs/common';
import { ProductServicePort } from 'src/domain/products/ports/product-service.port';
import { Product } from 'src/domain/products/entities/product.entity';

@Injectable()
export class CreateProductUseCase {
  constructor(
    @Inject('ProductServicePort') // Asegúrate de inyectar con el token correcto
    private readonly productService: ProductServicePort,
  ) {}

  async execute(productData: Product): Promise<Product> {
    return this.productService.create(productData);
  }
}
