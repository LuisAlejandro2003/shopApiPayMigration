// src/infrastructure/products/product.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductController } from './controllers/product.controller';
import { CreateProductUseCase } from 'src/application/products/use-cases/create-product.use-case';
import { DeleteProductUseCase } from 'src/application/products/use-cases/delete-product.use-case';
import { GetProductByIdUseCase } from 'src/application/products/use-cases/get-product-by-id.use-case';
import { UpdateProductUseCase } from 'src/application/products/use-cases/update-product.use-case';
import { GetAllProductsUseCase } from 'src/application/products/use-cases/get-all-products.use-case';
import { MongoDBProductAdapter } from './adapters/mongodb-product.adapter';
import { ProductSchema } from './adapters/product.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Product', schema: ProductSchema }])],
  controllers: [ProductController],
  providers: [
    CreateProductUseCase,
    DeleteProductUseCase,
    GetProductByIdUseCase,
    UpdateProductUseCase,
    GetAllProductsUseCase,
    {
      provide: 'ProductServicePort',
      useClass: MongoDBProductAdapter,
    },
  ],
  exports: ['ProductServicePort'], // Exporta si lo necesita otro módulo
})
export class ProductModule {}
