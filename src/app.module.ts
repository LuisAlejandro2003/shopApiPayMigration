// src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductModule } from './infrastructure/products/product.module';
import { PaymentModule } from './infrastructure/payments/payment.module';
import { NotificationModule } from './infrastructure/notifications/notification.module';
import { ContactModule } from './infrastructure/contacts/contact.module';
import { UserModule } from './infrastructure/users/user.module';
import { TokenModule } from './infrastructure/tokens/token.module';
@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    ProductModule,
    PaymentModule,
    NotificationModule,
    ContactModule,
    UserModule,
    TokenModule,
  ],
})
export class AppModule {}
