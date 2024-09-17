// order.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { User } from '../user/user.schema';
import { Product } from '../products/product.schema';

export type OrderDocument = Order & Document;

@Schema({ timestamps: true })
export class Order {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' ,  required: true })
  user: User;

  @Prop([
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      quantity: Number,
      price: Number,
    },
    
  ])
  items: { product: Product; quantity: number; price: number }[];

  @Prop({ required: true })
  total: number;

  @Prop({ type: Object, required: true })
  address: {
    houseNumber: string;
    street: string;
    city: string;
    postalCode: string;
    country: string;
  };

  @Prop({ default: 'processing' })
  status: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
