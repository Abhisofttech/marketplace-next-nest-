import { Module } from '@nestjs/common';
import { SalesAnalyticsService } from './salesanalytics.service';
import { SalesAnalyticsController } from './salesanalytics.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from 'src/order/order.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
  ],
  providers: [SalesAnalyticsService],
  controllers: [SalesAnalyticsController]
})
export class SalesanalyticsModule {}
