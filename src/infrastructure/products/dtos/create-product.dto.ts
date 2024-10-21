// src/infrastructure/products/dtos/create-product.dto.ts
import { IsString, IsNumber } from 'class-validator';

export class CreateProductDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly brand: string;

  @IsString()
  readonly category: string;

  @IsNumber()
  readonly price: number;

  @IsString()
  readonly description: string;
}
