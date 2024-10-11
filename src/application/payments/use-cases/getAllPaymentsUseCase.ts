import { Injectable, Inject } from '@nestjs/common';
import { PaymentServicePort } from 'src/domain/payments/ports/payment-service.port';

@Injectable()
export class GetAllPaymentsUseCase {
  constructor(
    @Inject('PaymentServicePort') private readonly paymentService: PaymentServicePort,
  ) {}

  async execute(queryParams: any): Promise<any> {
    return this.paymentService.findAll(queryParams);
  }
}
