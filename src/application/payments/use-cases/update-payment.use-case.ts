import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { PaymentServicePort } from 'src/domain/payments/ports/payment-service.port';
import { Payment } from 'src/domain/payments/entities/payment.entity';

@Injectable()
export class UpdatePaymentUseCase {
  constructor(
    @Inject('PaymentServicePort')
    private readonly paymentService: PaymentServicePort,
  ) {}

  async execute(id: string, paymentData: Partial<Payment>): Promise<Payment> {
    const existingPayment = await this.paymentService.findById(id);
    if (!existingPayment) {
      throw new NotFoundException(`Payment with ID ${id} not found`);
    }

    const updatedPayment = new Payment(
      id,
      paymentData.title || existingPayment.title,
      paymentData.price !== undefined ? paymentData.price : existingPayment.price,
      paymentData.status || existingPayment.status,
      paymentData.externalReference || existingPayment.externalReference,
      paymentData.successUrl || existingPayment.successUrl,
      paymentData.failureUrl || existingPayment.failureUrl,
      paymentData.productId || existingPayment.productId // Asegúrate de incluir el productId aquí
    );

    return this.paymentService.update(id, updatedPayment);
  }
}
