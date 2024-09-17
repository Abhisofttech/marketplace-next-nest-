// src/category/category.service.ts

import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from './category.schema';

@Injectable()
export class CategoryService {
  constructor(@InjectModel('Category') private readonly categoryModel: Model<Category>) {}

  async getParentCategories(): Promise<Category[]> {
    return this.categoryModel.find({ parentCategory: null }).exec();
  }

  async getSubCategoriesByParent(parentId: string): Promise<Category[]> {
    const parentCategory = await this.categoryModel.findById(parentId).exec();
    if (!parentCategory) {
      throw new NotFoundException('Parent category not found');
    }
    return this.categoryModel.find({ parentCategory: parentId }).exec();
  }

  async createCategory(name: string, parentCategoryId?: string): Promise<Category> {
    const existingCategory = await this.categoryModel.findOne({ name }).exec();
    if (existingCategory) {
      throw new ConflictException('Category with this name already exists');
    }

    let parentCategory = null;
    if (parentCategoryId) {
      parentCategory = await this.categoryModel.findById(parentCategoryId).exec();
      if (!parentCategory) {
        throw new NotFoundException('Parent category not found');
      }
    }

    const newCategory = new this.categoryModel({ name, parentCategory });
    return newCategory.save();
  }
}
