import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PaymentServicePort } from 'src/domain/payments/ports/payment-service.port';
import { Payment } from 'src/domain/payments/entities/payment.entity';
import { PaymentDocument } from './payment.schema';
import * as paypal from '@paypal/checkout-server-sdk';

@Injectable()
export class MongoDBPaymentAdapter implements PaymentServicePort {
  private paypalClient: paypal.core.PayPalHttpClient;

  constructor(
    @InjectModel('Payment') private paymentModel: Model<PaymentDocument>
  ) {
    const environment = new paypal.core.SandboxEnvironment(
      process.env.PAYPAL_CLIENT_ID,
      process.env.PAYPAL_CLIENT_SECRET,
    );
    this.paypalClient = new paypal.core.PayPalHttpClient(environment);
  }

  async create(payment: Payment): Promise<{ payment: Payment, links: any[] }> {
    const request = new paypal.orders.OrdersCreateRequest();
    request.requestBody({
      intent: 'CAPTURE',
      purchase_units: [{
        amount: {
          currency_code: 'USD',
          value: payment.price.toFixed(2),
        },
      }],
      application_context: {
        return_url: payment.successUrl,
        cancel_url: payment.failureUrl,
      },
    });

    try {
      const order = await this.paypalClient.execute(request);
      const links = order.result.links; // Obtener todos los enlaces (links) de la respuesta de PayPal

      // Guardar el pago en MongoDB
      const savedPayment = new this.paymentModel({
        title: payment.title,
        price: payment.price,
        status: 'Pending',
        externalReference: order.result.id,
        successUrl: payment.successUrl,
        failureUrl: payment.failureUrl,
        productId: payment.productId, 
      });
      await savedPayment.save();

      return {
        payment: new Payment(
          savedPayment._id.toString(),
          savedPayment.title,
          savedPayment.price,
          savedPayment.status,
          savedPayment.externalReference,
          savedPayment.successUrl,
          savedPayment.failureUrl,
          savedPayment.productId // También lo agregamos aquí
        ),
        links, // Retornar todos los enlaces necesarios
      };
    } catch (error) {
      throw new InternalServerErrorException(`Error creating payment: ${error.message}`);
    }
  }

  async delete(id: string): Promise<void> {
    const result = await this.paymentModel.findByIdAndDelete(id).exec();
    if (!result) throw new NotFoundException('Payment not found');
  }

  async capturePayment(orderId: string): Promise<any> {
    const request = new paypal.orders.OrdersCaptureRequest(orderId);
    request.requestBody({});
    const capture = await this.paypalClient.execute(request);
    return capture.result;
  }


  async findById(id: string): Promise<Payment | null> {
    const payment = await this.paymentModel.findById(id).exec();
    if (!payment) throw new NotFoundException('Payment not found');
    return new Payment(
      payment._id.toString(),
      payment.title,
      payment.price,
      payment.status,
      payment.externalReference,
      payment.successUrl,
      payment.failureUrl,
      payment.productId // También lo agregamos aquí
    );
  }

  async update(id: string, payment: Payment): Promise<Payment> {
    const updatedPayment = await this.paymentModel.findByIdAndUpdate(
      id,
      {
        title: payment.title,
        price: payment.price,
        status: payment.status,
        externalReference: payment.externalReference,
        successUrl: payment.successUrl,
        failureUrl: payment.failureUrl,
        productId: payment.productId, // Agregamos el productId aquí también
      },
      { new: true },
    ).exec();

    if (!updatedPayment) throw new NotFoundException('Payment not found');

    return new Payment(
      updatedPayment._id.toString(),
      updatedPayment.title,
      updatedPayment.price,
      updatedPayment.status,
      updatedPayment.externalReference,
      updatedPayment.successUrl,
      updatedPayment.failureUrl,
      updatedPayment.productId // Lo agregamos aquí
    );
  }

  async findAll(queryParams: any): Promise<any> {
    const { page = 1, limit = 10, ...filters } = queryParams;
    const skip = (page - 1) * limit;
    const payments = await this.paymentModel.find(filters).skip(skip).limit(limit).exec();
    const totalItems = await this.paymentModel.countDocuments(filters).exec();

    return {
      data: payments.map(payment => new Payment(
        payment._id.toString(),
        payment.title,
        payment.price,
        payment.status,
        payment.externalReference,
        payment.successUrl,
        payment.failureUrl,
        payment.productId 
      )),
      meta: {
        totalItems,
        itemCount: payments.length,
        itemsPerPage: limit,
        totalPages: Math.ceil(totalItems / limit),
        currentPage: page,
      },
    };
  }
}
