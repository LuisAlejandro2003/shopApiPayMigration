// src/application/payments/use-cases/create-payment.use-case.ts
import { Injectable, Inject } from '@nestjs/common';
import { PaymentServicePort } from 'src/domain/payments/ports/payment-service.port';
import { Payment } from 'src/domain/payments/entities/payment.entity';

@Injectable()
export class CreatePaymentUseCase {
  constructor(
    @Inject('PaymentServicePort')
    private readonly paymentService: PaymentServicePort,
  ) {}

  async execute(paymentData: Partial<Payment>): Promise<{ payment: Payment, links: any[] }> {
    const payment = new Payment(
      paymentData.id!,
      paymentData.title!,
      paymentData.price!,
      paymentData.status!,
      paymentData.externalReference!,
      paymentData.successUrl!,
      paymentData.failureUrl!,
    );

    return this.paymentService.create(payment); // Retorno directamente el objeto esperado
  }
}
