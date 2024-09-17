import { Controller, Post, Body, Param, Delete, Get, Put, UseInterceptors, UploadedFile, HttpException, HttpStatus, UseGuards, Request } from '@nestjs/common';
import { ProductsService } from './products.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Product } from './product.schema';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post('/create-product')
  @UseInterceptors(FileInterceptor('image'))
  async createProduct(@UploadedFile() file: Express.Multer.File, @Body() createProductDto: any): Promise<Product> {
    
    if (!file) {
      throw new HttpException('File is required', HttpStatus.BAD_REQUEST);
    }
    
    return this.productsService.createProduct(file, createProductDto);
  }

  
  @Put('update-product/:id')
  @UseInterceptors(FileInterceptor('image'))
  async updateProduct(@Param('id') id: string, @UploadedFile() file: Express.Multer.File, @Body() updateProductDto: any): Promise<Product> {
    return this.productsService.updateProduct(id, file, updateProductDto);
  }

  
  


  @Delete('delete-product/:id')
  async deleteProduct(@Param('id') id: string): Promise<any> {
    return this.productsService.deleteProduct(id);
  }

  @Get('get-products')
  async getAllProducts(): Promise<Product[]> {
    return this.productsService.getAllProducts();
  }

  @Get('get-product/:id')
  async getProductById(@Param('id') id: string): Promise<Product> {
    return this.productsService.getProductById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('seller-product')
  async getProductsBySeller( @Request() req): Promise<Product[]> {
    const sellerId = req.user.id;
    return this.productsService.getProductsBySeller(sellerId);
  }
}
