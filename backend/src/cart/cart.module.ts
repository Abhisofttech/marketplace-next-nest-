import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CartService } from './cart.service';
import { Cart, CartSchema } from './cart.schema';
import { Product, ProductSchema } from '../products/product.schema';
import { CartController } from './cart.controller';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Cart.name, schema: CartSchema },
      { name: Product.name, schema: ProductSchema }
    ]),
    ConfigModule.forRoot(), // Ensure this is present to load .env file
    JwtModule.register({
      secret: process.env.JWT_SECRET, // Directly use process.env to access the secret
      signOptions: { expiresIn: '1h' },
    }),
    
  ],
  providers: [CartService],
  controllers:[CartController],
  exports: [CartService ,MongooseModule],
})
export class CartModule {}
