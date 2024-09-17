import { Module } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { StripeController } from './stripe.controller';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports:[
    JwtModule.register({
      secret: process.env.JWT_SECRET, // Directly use process.env to access the secret
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [StripeService],
  controllers: [StripeController]
})
export class StripeModule {}
