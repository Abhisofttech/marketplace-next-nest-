
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

// Define ProductDocument as a type alias for Product & Document
export type ProductDocument = Product & Document;

@Schema({ timestamps: true })
export class Product {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  price: number;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Category' })
  category: MongooseSchema.Types.ObjectId;

  @Prop({ required: true })
  imageUrl: string;

  @Prop({ required: true, min: 0 })
  stock: number;

  @Prop()
  views: number;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  seller: MongooseSchema.Types.ObjectId;
}

// Create the schema for the Product class
export const ProductSchema = SchemaFactory.createForClass(Product);
