// src/category/category.schema.ts

import { Schema, Document } from 'mongoose';

export const CategorySchema = new Schema({
  name: { type: String, required: true, unique: true },
  parentCategory: { type: Schema.Types.ObjectId, ref: 'Category', default: null },
}, { timestamps: true });

export interface Category extends Document {
  id: string;
  name: string;
  parentCategory: string | null;
  createdAt: Date;
  updatedAt: Date;
}
