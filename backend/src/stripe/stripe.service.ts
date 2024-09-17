import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import Stripe from 'stripe'

@Injectable()
export class StripeService {
  private stripe: Stripe

  constructor(private configService: ConfigService) {
    // Set up the Stripe instance with the secret key and API version
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2022-11-15' as Stripe.LatestApiVersion, // Cast the version correctly
    })
  }

  async createCheckoutSession(cartItems: any[], totalPrice: number) {
    const session = await this.stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: cartItems.map(item => ({
        price_data: {
          currency: 'inr',
          product_data: {
            name: item.product.name,
          },
          unit_amount: item.product.price * 100, // Convert to smallest currency unit (cents)
        },
        quantity: item.quantity,
      })),
      mode: 'payment',
      success_url: `${process.env.FRONTEND_URL}/BuyerDashboard/payment/success`, // Use process.env for success and cancel URLs
      cancel_url: `${process.env.FRONTEND_URL}/BuyerDashboard/payment//cancel`,
    })
    return session
  }
}
