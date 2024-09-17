import { Controller, Get } from '@nestjs/common';
import { SalesAnalyticsService } from './salesanalytics.service';

@Controller('/analytics')
export class SalesAnalyticsController {
  constructor(private readonly salesAnalyticsService: SalesAnalyticsService) {}

  @Get('sales-data')
  async getSalesData() {
    return this.salesAnalyticsService.getSalesData();
  }
  
}