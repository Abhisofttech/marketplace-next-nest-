import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Product } from './product.schema';
import cloudinary from '../config/cloudinary.config';

@Injectable()
export class ProductsService {
  constructor(@InjectModel(Product.name) private productModel: Model<Product>) {}

//  
async createProduct(file: Express.Multer.File, createProductDto: any): Promise<Product> {
    const { name, description, price, category, stock, seller } = createProductDto;

    // Upload image to Cloudinary from buffer
    const uploadResult = await new Promise<any>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream({ resource_type: 'auto' }, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });

      // Pipe the buffer to Cloudinary
      uploadStream.end(file.buffer);
    });

    const imageUrl = uploadResult.secure_url;

    const product = new this.productModel({
      name,
      description,
      price,
      category,
      stock,
      seller,
      imageUrl,
    });

    return product.save();
  }



async updateProduct(id: string, file: Express.Multer.File, updateProductDto: any): Promise<Product> {
  const product = await this.productModel.findById(id);
  if (!product) throw new Error('Product not found');

  // If there's a new image file, handle Cloudinary upload and delete old image
  if (file) {
    if (product.imageUrl) {
      const publicId = product.imageUrl.split('/').pop().split('.')[0];
      await cloudinary.uploader.destroy(publicId);
    }

    // Upload new image to Cloudinary
    const uploadResult = await new Promise<any>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream({ resource_type: 'auto' }, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
      uploadStream.end(file.buffer);
    });

    product.imageUrl = uploadResult.secure_url;
  }

  // Assign individual fields explicitly, only if they are defined
  product.name = updateProductDto.name || product.name;
  product.description = updateProductDto.description || product.description;
  product.price = updateProductDto.price || product.price;
  
  // Check if category is provided and is a valid ObjectId
  if (updateProductDto.category) {
    product.category = updateProductDto.category;
  }

  product.stock = updateProductDto.stock || product.stock;

  try {
    return await product.save();
  } catch (error) {
    throw new Error(`Error saving product: ${error.message}`);
  }
}



  async deleteProduct(id: string): Promise<any> {
    const product = await this.productModel.findById(id);
    if (!product) throw new Error('Product not found');

    if (product.imageUrl) {
      const publicId = product.imageUrl.split('/').pop().split('.')[0];
      await cloudinary.uploader.destroy(publicId);
    }

    return this.productModel.deleteOne({ _id: id });
  }

  async getAllProducts(): Promise<Product[]> {
    return this.productModel.find().exec();
  }

  async getProductById(id: string): Promise<Product> {
    return this.productModel.findById(id).exec();
  }

  async getProductsBySeller(sellerId: string): Promise<Product[]> {
    return this.productModel.find({ seller: sellerId }).exec();
  }

  async decreaseStock(productId: string, quantity: number) {
    return this.productModel.findByIdAndUpdate(productId, {
      $inc: { stock: -quantity },
    });
  }
}
