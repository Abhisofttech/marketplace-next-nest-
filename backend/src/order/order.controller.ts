import { Controller, Post, Body, UseGuards, Get, Param, Put, Request } from '@nestjs/common';
import { OrderService } from './order.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('orders')
export class OrderController {
  constructor(private orderService: OrderService) {}

  

  @UseGuards(JwtAuthGuard)
  @Get('order-history')
  async getOrderHistory( @Request() req) {
    const userId = req.user.id;
    return this.orderService.getOrderHistory(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('order-status')
  async getOrderStatus( @Request() req) {
    const userId = req.user.id;
    return this.orderService.getOrderStatus(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('seller-orders')
  async getSellerOrders( @Request() req) {
    const sellerId = req.user.id;
    return this.orderService.getSellerOrders(sellerId);
  }

  @UseGuards(JwtAuthGuard)
  @Put('update-status/:id')
  async updateOrderStatus(@Param('id') orderId: string, @Body('status') status: string) {
    return this.orderService.updateOrderStatus(orderId, status);
  }
  

  @UseGuards(JwtAuthGuard)
  @Post('create-order-and-clear-cart')
  async createOrderAndClearCart(
    @Request() req,
    @Body() body: { cartItems: any[], totalPrice: number, address: any }
  ) {
    const userId = req.user.id; // Extract user ID from JWT token
    const { cartItems, totalPrice, address } = body;

    return this.orderService.handlePaymentSuccess(userId, cartItems, totalPrice, address, 'payment-id-placeholder');
  }


}
