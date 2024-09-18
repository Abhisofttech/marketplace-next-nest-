import { Controller, Get, Res } from '@nestjs/common';
import { SalesAnalyticsService } from './salesanalytics.service';
import { ProductsService } from 'src/products/products.service';
import { CartService } from 'src/cart/cart.service';
import { OrderService } from 'src/order/order.service';

@Controller('analytics')
export class SalesAnalyticsController {
  constructor(private readonly salesAnalyticsService: SalesAnalyticsService,
    private productService: ProductsService,
    private cartService: CartService,
    private orderService: OrderService
  ) {}

  @Get('sales-data')
  async getSalesData() {
    return this.salesAnalyticsService.getSalesData();
  }
  @Get('user-behavior')
  async getUserBehaviorAnalytics(@Res() res) {
    try {
      const mostViewedProducts = await this.productService.findMostViewed();
      const abandonedCarts = await this.cartService.findAbandonedCarts();
      const totalOrders = await this.orderService.countOrders();
      const totalCarts = await this.cartService.countCarts();
      const conversionRate = ((totalOrders / totalCarts) * 100).toFixed(2);

      res.status(200).json({
        success: true,
        mostViewedProducts,
        abandonedCarts,
        conversionRate,
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  @Get('stock')
  async getStockProducts(@Res() res){
    try {
      const stockProducts = await this.productService.getStockProducts();
      
      return res.status(200).json({
        success: true,
        stockProducts,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
  
}