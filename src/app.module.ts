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

// Contact Imports
import { ContactController } from './infrastructure/contacts/controllers/contact.controller';
import { CreateContactUseCase } from './application/contacts/use-cases/create-contact.use-case';
import { DeleteContactUseCase } from './application/contacts/use-cases/delete-contact.use-case';
import { GetContactByIdUseCase } from './application/contacts/use-cases/get-contact-by-id.use-case';
import { UpdateContactUseCase } from './application/contacts/use-cases/update-contact.use-case';
import { GetAllContactsUseCase } from './application/contacts/use-cases/get-all-contacts.use-case';
import { MongoDBContactAdapter } from './infrastructure/contacts/adapters/mongodb-contact.adapter';
import { ContactSchema } from './infrastructure/contacts/adapters/contact.schema';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    MongooseModule.forFeature([
      { name: 'Product', schema: ProductSchema },
      { name: 'Payment', schema: PaymentSchema },
      { name: 'Notification', schema: NotificationSchema },
      { name: 'Contact', schema: ContactSchema }, // Se añade el esquema de Contact
    ]),
  ],
  controllers: [
    ProductController,
    PaymentController,
    NotificationController,
    ContactController, // Se añade el controlador de Contact
  ],
  providers: [
    // Product Providers
    CreateProductUseCase,
    DeleteProductUseCase,
    GetProductByIdUseCase,
    UpdateProductUseCase,
    GetAllProductsUseCase,
    {
      provide: 'ProductServicePort',
      useClass: MongoDBProductAdapter,
    },

    // Payment Providers
    CreatePaymentUseCase,
    DeletePaymentUseCase,
    GetPaymentByIdUseCase,
    UpdatePaymentUseCase,
    GetAllPaymentsUseCase,
    {
      provide: 'PaymentServicePort',
      useClass: MongoDBPaymentAdapter,
    },

    // Notification Providers
    CreateNotificationUseCase,
    DeleteNotificationUseCase,
    GetNotificationByIdUseCase,
    UpdateNotificationUseCase,
    GetAllNotificationsUseCase,
    {
      provide: 'NotificationServicePort',
      useClass: MongoDBNotificationAdapter,
    },

    // Contact Providers
    CreateContactUseCase,
    DeleteContactUseCase,
    GetContactByIdUseCase,
    UpdateContactUseCase,
    GetAllContactsUseCase,
    {
      provide: 'ContactServicePort',
      useClass: MongoDBContactAdapter, // Adaptador de Contact
    },
  ],
})
export class AppModule {}
