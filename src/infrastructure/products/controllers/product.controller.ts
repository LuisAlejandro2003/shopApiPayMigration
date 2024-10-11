// src/infrastructure/products/controllers/product.controller.ts
import { Controller, Get, Post, Patch, Delete, Param, Query, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { CreateProductUseCase } from 'src/application/products/use-cases/create-product.use-case';
import { Product } from 'src/domain/products/entities/product.entity';

@Controller('api/v1/products')
export class ProductController {
  constructor(private readonly createProductUseCase: CreateProductUseCase) {}

  @Get()
  async findAll(@Query('page') page = 1, @Query('limit') limit = 10, @Query() query) {
    // Implementa el caso de uso para "findAll"
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    // Implementa el caso de uso para "findOne"
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() productData: Product) {
    const product = await this.createProductUseCase.execute(productData);
    return { message: 'Product created successfully', data: product };
  }

}
