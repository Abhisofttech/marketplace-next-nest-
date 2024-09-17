import { Schema, Document } from 'mongoose';
import { AddressSchema } from '../address/address.schema';

export const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'seller', 'buyer'], default: 'buyer' },
  phoneNumber: { type: String },
  address: { type: AddressSchema },
  resetToken: { type: String }  // Add this field
});

export interface User extends Document {
  name: string;
  email: string;
  password: string;
  role: string;
  phoneNumber?: string;
  address?: {
    houseNumber: string;
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  resetToken?: string;  // Add this field
}
