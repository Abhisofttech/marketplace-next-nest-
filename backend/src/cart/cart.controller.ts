import { Controller, Post, Get, Delete, Patch, Param, Body, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CartService } from './cart.service';

@Controller('cart')
@UseGuards(JwtAuthGuard)
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post('add-item')
  async addItemToCart(
    @Body('productId') productId: string,
    @Body('quantity') quantity: number,
    @Request() req
  ) {
    const userId = req.user.id;
    return this.cartService.addItemToCart(userId, productId, quantity);
  }

  @Get('get-items')
  async getCartItems(@Request() req) {
    const userId = req.user.id;
    return this.cartService.getCartItems(userId);
  }

  @Delete('remove-item/:itemId')
  async deleteCartItem(@Param('itemId') itemId: string, @Request() req) {
    const userId = req.user.id;
    return this.cartService.deleteCartItem(userId, itemId);
  }

  @Patch('update-item/:itemId')
  async updateCartItemQuantity(
    @Param('itemId') itemId: string,
    @Body('quantity') quantity: number,
    @Request() req
  ) {
    const userId = req.user.id;
    return this.cartService.updateCartItemQuantity(userId, itemId, quantity);
  }

  @Post('clear-cart')
  async clearCart(@Request() req) {
    const userId = req.user.id;
    return this.cartService.clearCart(userId);
  }
}
