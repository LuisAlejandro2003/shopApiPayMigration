// src/infrastructure/payments/dtos/create-payment.dto.ts
import { IsString, IsNumber, IsOptional, IsUrl } from 'class-validator';

export class CreatePaymentDto {
  @IsString()
  readonly title: string;

  @IsNumber()
  readonly quantity: number;

  @IsNumber()
  readonly price: number;

  @IsString()
  readonly status: string;

  @IsString()
  readonly externalReference: string;

  @IsString()
  readonly successUrl: string;

  @IsString()
  readonly failureUrl: string;

  @IsString()
  readonly pendingUrl: string;
}
