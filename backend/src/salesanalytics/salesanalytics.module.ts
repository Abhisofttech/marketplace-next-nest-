import { Module } from '@nestjs/common';
import { SalesAnalyticsService } from './salesanalytics.service';
import { SalesAnalyticsController } from './salesanalytics.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from 'src/order/order.schema';
import { CartService } from 'src/cart/cart.service';
import { OrderService } from 'src/order/order.service';
import { ProductsService } from 'src/products/products.service';
import { CartModule } from 'src/cart/cart.module';
import { ProductsModule } from 'src/products/products.module';
import { EmailModule } from 'src/email/email.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
    CartModule,
    ProductsModule,
    EmailModule
  ],
  providers: [SalesAnalyticsService , CartService , OrderService , ProductsService],
  controllers: [SalesAnalyticsController]
})
export class SalesanalyticsModule {}
