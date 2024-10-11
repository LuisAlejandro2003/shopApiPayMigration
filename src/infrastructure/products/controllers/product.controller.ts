import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common';
import { CreateProductUseCase } from 'src/application/products/use-cases/create-product.use-case';
import { DeleteProductUseCase } from 'src/application/products/use-cases/delete-product.use-case';
import { GetProductByIdUseCase } from 'src/application/products/use-cases/get-product-by-id.use-case';
import { UpdateProductUseCase } from 'src/application/products/use-cases/update-product.use-case';
import { GetAllProductsUseCase } from 'src/application/products/use-cases/get-all-products.use-case';

@Controller('api/v1/products')
export class ProductController {
  constructor(
    private readonly createProductUseCase: CreateProductUseCase,
    private readonly deleteProductUseCase: DeleteProductUseCase,
    private readonly getProductByIdUseCase: GetProductByIdUseCase,
    private readonly updateProductUseCase: UpdateProductUseCase,
    private readonly getAllProductsUseCase: GetAllProductsUseCase,
  ) {}

  @Post()
  async create(@Body() productData: any) {
    return this.createProductUseCase.execute(productData);
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.getProductByIdUseCase.execute(id);
  }

  @Get()
  async findAll() {
    return this.getAllProductsUseCase.execute();
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updatedData: any) {
    return this.updateProductUseCase.execute(id, updatedData);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.deleteProductUseCase.execute(id);
  }
}
