import { Controller, Post, Body,  UseGuards } from '@nestjs/common'
import { StripeService } from './stripe.service'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'

@Controller('payment')
export class StripeController {
  constructor(private stripeService: StripeService) {}

  @UseGuards(JwtAuthGuard)
  @Post('checkout')
  async createCheckoutSession(
    @Body() body: { cartItems: any[], totalPrice: number }
  ) {
    
    // Extract cartItems and totalPrice from the request body
    const { cartItems, totalPrice } = body

    // Call the Stripe service to create a checkout session
    const session = await this.stripeService.createCheckoutSession(cartItems, totalPrice)
    
    return { id: session.id }
  }
}
