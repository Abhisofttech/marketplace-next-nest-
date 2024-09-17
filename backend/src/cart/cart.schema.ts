
import { Schema, Document, Types } from 'mongoose';

// Define the schema for Cart
export const CartSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  items: [{
    product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true }
  }]
}, { timestamps: true });

// Define the interface for Cart
export interface Cart extends Document {
  user: Types.ObjectId;
  items: {
    product: Types.ObjectId;
    quantity: number;
  }[];
}

// Define the CartDocument that extends Cart and Document
export interface CartDocument extends Cart, Document {}

// Export the model name and schema
export const Cart = {
  name: 'Cart',
  schema: CartSchema,
};
