// src/infrastructure/payments/payment.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PaymentController } from './controllers/payment.controller';
import { CreatePaymentUseCase } from 'src/application/payments/use-cases/create-payment.use-case';
import { DeletePaymentUseCase } from 'src/application/payments/use-cases/delete-payment.use-case';
import { GetPaymentByIdUseCase } from 'src/application/payments/use-cases/get-payment-by-id.use-case';
import { UpdatePaymentUseCase } from 'src/application/payments/use-cases/update-payment.use-case';
import { GetAllPaymentsUseCase } from 'src/application/payments/use-cases/getAllPaymentsUseCase';
import { MongoDBPaymentAdapter } from './adapters/mongodb-payment.adapter';
import { PaymentSchema } from './adapters/payment.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Payment', schema: PaymentSchema }])],
  controllers: [PaymentController],
  providers: [
    CreatePaymentUseCase,
    DeletePaymentUseCase,
    GetPaymentByIdUseCase,
    UpdatePaymentUseCase,
    GetAllPaymentsUseCase,
    {
      provide: 'PaymentServicePort',
      useClass: MongoDBPaymentAdapter,
    },
  ],
  exports: ['PaymentServicePort'],
})
export class PaymentModule {}
