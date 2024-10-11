import { Injectable, Inject } from '@nestjs/common';
import { PaymentServicePort } from 'src/domain/payments/ports/payment-service.port';

@Injectable()
export class GetPaymentByIdUseCase {
  constructor(
    @Inject('PaymentServicePort') private readonly paymentService: PaymentServicePort,
  ) {}

  async execute(id: string) {
    return this.paymentService.findById(id);
  }
}
