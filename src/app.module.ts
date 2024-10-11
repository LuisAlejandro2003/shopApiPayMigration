// src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductController } from './infrastructure/products/controllers/product.controller';
import { CreateProductUseCase } from './application/products/use-cases/create-product.use-case';
import { MongoDBProductAdapter } from './infrastructure/products/adapters/mongodb-product.adapter';

import { Product, ProductSchema } from './domain/products/entities/product.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),  // Carga las variables de entorno desde .env
    MongooseModule.forRoot(process.env.MONGODB_URI),  // Configuración de la conexión a MongoDB
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),  // Define el modelo de Product
  ],
  controllers: [
    ProductController,  // Registra el controlador de productos
  ],
  providers: [
    CreateProductUseCase,
    {
      provide: 'ProductServicePort',  // Puerto para el servicio de producto
      useClass: MongoDBProductAdapter,  // Implementación del puerto con MongoDB
    },
  ],
})
export class AppModule {}
