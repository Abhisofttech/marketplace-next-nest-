import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { EmailModule } from 'src/email/email.module';
import { Order, OrderSchema } from './order.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsModule } from 'src/products/products.module';
import { JwtModule } from '@nestjs/jwt';
import { CartModule } from 'src/cart/cart.module';

@Module({
  imports:[
    EmailModule,
    MongooseModule.forFeature([
      { name: Order.name, schema: OrderSchema }
    ]),
    JwtModule.register({
      secret: process.env.JWT_SECRET, // Directly use process.env to access the secret
      signOptions: { expiresIn: '1h' },
    }),
    ProductsModule,
    CartModule
  ],
  providers: [OrderService],
  controllers: [OrderController],
  exports: [OrderService]
})
export class OrderModule {}
