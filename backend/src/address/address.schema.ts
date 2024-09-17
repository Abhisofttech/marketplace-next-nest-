
import { Schema, Document } from 'mongoose';

// Define the schema for Address
export const AddressSchema = new Schema({
  houseNumber: { type: String },
  street: { type: String },
  city: { type: String },
  state: { type: String },
  postalCode: { type: String },
  country: { type: String }
});

// Define the interface for Address
export interface Address {
  houseNumber: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}
