// src/infrastructure/payments/controllers/payment.controller.ts
import { Controller, Post, Get, Patch, Delete, Body, Param, Query, HttpCode, HttpStatus } from '@nestjs/common';
import { CreatePaymentUseCase } from 'src/application/payments/use-cases/create-payment.use-case';
import { DeletePaymentUseCase } from 'src/application/payments/use-cases/delete-payment.use-case';
import { GetPaymentByIdUseCase } from 'src/application/payments/use-cases/get-payment-by-id.use-case';
import { UpdatePaymentUseCase } from 'src/application/payments/use-cases/update-payment.use-case';
import { GetAllPaymentsUseCase } from 'src/application/payments/use-cases/getAllPaymentsUseCase';
import { Payment } from 'src/domain/payments/entities/payment.entity'; // Asegúrate de importar el tipo Payment

@Controller('api/v1/payments')
export class PaymentController {
  constructor(
    private readonly createPaymentUseCase: CreatePaymentUseCase,
    private readonly getPaymentByIdUseCase: GetPaymentByIdUseCase,
    private readonly updatePaymentUseCase: UpdatePaymentUseCase,
    private readonly deletePaymentUseCase: DeletePaymentUseCase,
    private readonly getAllPaymentsUseCase: GetAllPaymentsUseCase, // Asegúrate de incluir este caso de uso
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() paymentData: Partial<Payment>) {
    const payment = await this.createPaymentUseCase.execute(paymentData);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Payment created successfully',
      data: payment,
    };
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAllPayments(@Query() queryParams: any) {

    return await this.getAllPaymentsUseCase.execute(queryParams);
  
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.getPaymentByIdUseCase.execute(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() paymentData: any) {
    return this.updatePaymentUseCase.execute(id, paymentData);
  }
  

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.deletePaymentUseCase.execute(id);
  }
}
