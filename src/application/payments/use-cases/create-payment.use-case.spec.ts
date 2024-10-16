import { CreatePaymentUseCase } from './create-payment.use-case';
import { PaymentServicePort } from '../../../domain/payments/ports/payment-service.port';

describe('CreatePaymentUseCase', () => {
  let useCase: CreatePaymentUseCase;
  let paymentService: PaymentServicePort;

  beforeEach(() => {
    paymentService = { create: jest.fn() } as any;
    useCase = new CreatePaymentUseCase(paymentService);
  });

  it('should call create method on PaymentServicePort', async () => {
    const paymentData = { title: 'Test Payment', price: 100 };
    await useCase.execute(paymentData);
    expect(paymentService.create).toHaveBeenCalledWith(paymentData);
  });
});
