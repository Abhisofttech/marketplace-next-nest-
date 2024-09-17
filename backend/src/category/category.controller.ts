// src/category/category.controller.ts

import { Controller, Get, Post, Body, Param, ConflictException, NotFoundException } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category } from './category.schema';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get('parent')
  async getParentCategories(): Promise<Category[]> {
    return this.categoryService.getParentCategories();
  }

  @Get('subcategories/:parentId')
  async getSubCategoriesByParent(@Param('parentId') parentId: string): Promise<Category[]> {
    return this.categoryService.getSubCategoriesByParent(parentId);
  }

  @Post('create-category')
  async createCategory(@Body() body: { name: string; parentCategoryId?: string }): Promise<Category> {
    const { name, parentCategoryId } = body;
    try {
      return await this.categoryService.createCategory(name, parentCategoryId);
    } catch (error) {
      if (error instanceof ConflictException) {
        throw new ConflictException(error.message);
      } else if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      } else {
        throw error;
      }
    }
  }
}
