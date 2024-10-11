import { Injectable, Inject } from '@nestjs/common';
import { PaymentServicePort } from 'src/domain/payments/ports/payment-service.port';

@Injectable()
export class DeletePaymentUseCase {
  constructor(
    @Inject('PaymentServicePort') private readonly paymentService: PaymentServicePort,
  ) {}

  async execute(id: string): Promise<void> {
    return this.paymentService.delete(id);
  }
}
