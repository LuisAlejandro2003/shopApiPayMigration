import { IsNumber, IsString } from 'class-validator';

export class CreatePaymentDto {
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

  @IsString()
  readonly productId: string; // Asegúrate de que productId está aquí
}
