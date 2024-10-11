// src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

// Product Imports
import { ProductController } from './infrastructure/products/controllers/product.controller';
import { CreateProductUseCase } from './application/products/use-cases/create-product.use-case';
import { DeleteProductUseCase } from './application/products/use-cases/delete-product.use-case';
import { GetProductByIdUseCase } from './application/products/use-cases/get-product-by-id.use-case';
import { UpdateProductUseCase } from './application/products/use-cases/update-product.use-case';
import { GetAllProductsUseCase } from './application/products/use-cases/get-all-products.use-case';
import { MongoDBProductAdapter } from './infrastructure/products/adapters/mongodb-product.adapter';
import { ProductSchema } from './infrastructure/products/adapters/product.schema';

// Payment Imports
import { PaymentController } from './infrastructure/payments/controllers/payment.controller';
import { CreatePaymentUseCase } from './application/payments/use-cases/create-payment.use-case';
import { DeletePaymentUseCase } from './application/payments/use-cases/delete-payment.use-case';
import { GetPaymentByIdUseCase } from './application/payments/use-cases/get-payment-by-id.use-case';
import { UpdatePaymentUseCase } from './application/payments/use-cases/update-payment.use-case';
import { GetAllPaymentsUseCase } from './application/payments/use-cases/getAllPaymentsUseCase';
import { MongoDBPaymentAdapter } from './infrastructure/payments/adapters/mongodb-payment.adapter';
import { PaymentSchema } from './infrastructure/payments/adapters/payment.schema';

// Notification Imports
import { NotificationController } from './infrastructure/notifications/controllers/notification.controller';
import { CreateNotificationUseCase } from './application/notifications/use-cases/create-notification.use-case';
import { DeleteNotificationUseCase } from './application/notifications/use-cases/delete-notification.use-case';
import { GetNotificationByIdUseCase } from './application/notifications/use-cases/get-notification-by-id.use-case';
import { UpdateNotificationUseCase } from './application/notifications/use-cases/update-notification.use-case';
import { GetAllNotificationsUseCase } from './application/notifications/use-cases/get-all-notifications.use-case';
import { MongoDBNotificationAdapter } from './infrastructure/notifications/adapters/mongodb-notification.adapter';
import { NotificationSchema } from './infrastructure/notifications/adapters/notification.schema';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    
    // Register schemas for Mongoose
    MongooseModule.forFeature([
      { name: 'Product', schema: ProductSchema },
      { name: 'Payment', schema: PaymentSchema },
      { name: 'Notification', schema: NotificationSchema } // Añadir esquema de Notification
    ]),
  ],
  controllers: [
    ProductController,
    PaymentController,
    NotificationController, // Registro del controlador de Notification
  ],
  providers: [
    // Product Use Cases and Adapter
    CreateProductUseCase,
    DeleteProductUseCase,
    GetProductByIdUseCase,
    UpdateProductUseCase,
    GetAllProductsUseCase,
    {
      provide: 'ProductServicePort',
      useClass: MongoDBProductAdapter,
    },
    
    // Payment Use Cases and Adapter
    CreatePaymentUseCase,
    DeletePaymentUseCase,
    GetPaymentByIdUseCase,
    UpdatePaymentUseCase,
    GetAllPaymentsUseCase,
    {
      provide: 'PaymentServicePort',
      useClass: MongoDBPaymentAdapter,
    },
    
    // Notification Use Cases and Adapter
    CreateNotificationUseCase,
    DeleteNotificationUseCase,
    GetNotificationByIdUseCase,
    UpdateNotificationUseCase,
    GetAllNotificationsUseCase,
    {
      provide: 'NotificationServicePort',
      useClass: MongoDBNotificationAdapter, // Usando el adaptador de Notification
    },
  ],
})
export class AppModule {}
