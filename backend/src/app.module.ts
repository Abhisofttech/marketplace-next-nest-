import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { AddressModule } from './address/address.module';
import { ConfigModule } from '@nestjs/config';
import { EmailModule } from './email/email.module';
import { CategoryModule } from './category/category.module';
import { ProductsModule } from './products/products.module';
import { MulterModule } from '@nestjs/platform-express';
import { CartModule } from './cart/cart.module';
import { StripeModule } from './stripe/stripe.module';
import { OrderModule } from './order/order.module';
import { SalesanalyticsModule } from './salesanalytics/salesanalytics.module';

@Module({
  
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Loads the .env file globally
      envFilePath: '.env',
    }),
    MulterModule.register({
      dest: './uploads',
    }),
    MongooseModule.forRoot(process.env.MONGO_URI ),
    AuthModule,
    UserModule,
    AddressModule,
    EmailModule,
    CategoryModule,
    ProductsModule,
    CartModule,
    StripeModule,
    OrderModule,
    SalesanalyticsModule,
  ]
})
export class AppModule {}

