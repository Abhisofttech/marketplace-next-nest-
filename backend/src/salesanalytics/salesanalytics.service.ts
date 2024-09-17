// sales-analytics.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from '../order/order.schema'; // Assuming you have an Order schema

@Injectable()
export class SalesAnalyticsService {
  constructor(
    @InjectModel('Order') private readonly orderModel: Model<Order>,
  ) {}

  async getSalesData() {
    // Aggregate total sales, revenue, and growth by month
    const salesData = await this.orderModel.aggregate([
      {
        $group: {
          _id: { month: { $month: '$createdAt' }, year: { $year: '$createdAt' } },
          totalSales: { $sum: 1 },
          totalRevenue: { $sum: '$total' },
        },
      },
    ]);

    return salesData;
  }
}