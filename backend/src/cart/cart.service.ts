import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Cart } from './cart.schema';
import { Product } from '../products/product.schema';

@Injectable()
export class CartService {
  constructor(
    @InjectModel(Cart.name) private cartModel: Model<Cart>,
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  async addItemToCart(userId: string, productId: string, quantity: number) {
    const product = await this.productModel.findById(productId);
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    let cart = await this.cartModel.findOne({ user: userId });
    if (!cart) {
      cart = new this.cartModel({ user: userId, items: [] });
    }

    const productObjectId = new Types.ObjectId(productId);
    const existingItemIndex = cart.items.findIndex(item => item.product.toString() === productObjectId.toString());
    if (existingItemIndex > -1) {
      cart.items[existingItemIndex].quantity += quantity;
    } else {
      cart.items.push({ product: productObjectId as any, quantity });
    }

    await cart.save();
    return cart;
  }

  async getCartItems(userId: string) {
    const cart = await this.cartModel.findOne({ user: userId }).populate('items.product');
    if (!cart) {
      throw new NotFoundException('Cart not found');
    }
    return cart.items;
  }

  async deleteCartItem(userId: string, itemId: string) {
    const cart = await this.cartModel.findOne({ user: userId });
    
    if (!cart) {
      throw new NotFoundException('Cart not found');
    }

    const itemObjectId = new Types.ObjectId(itemId);
    
    const itemIndex = cart.items.findIndex(item => item.product.toString() === itemObjectId.toString());
    
    console.log("itemIndex",itemIndex)
    if (itemIndex === -1) {
      throw new NotFoundException('Item not found in cart');
    }

    cart.items.splice(itemIndex, 1);
    await cart.save();
    return cart;
  }

  async updateCartItemQuantity(userId: string, itemId: string, quantity: number) {
    const cart = await this.cartModel.findOne({ user: userId });
    if (!cart) {
      throw new NotFoundException('Cart not found');
    }

    const itemObjectId = new Types.ObjectId(itemId);
    const itemIndex = cart.items.findIndex(item => item.product.toString() === itemObjectId.toString());
    if (itemIndex === -1) {
      throw new NotFoundException('Item not found in cart');
    }

    cart.items[itemIndex].quantity = quantity;
    await cart.save();
    return cart;
  }

  async clearCart(userId: string) {
    const cart = await this.cartModel.findOne({ user: userId });
    if (!cart) {
      throw new NotFoundException('Cart not found');
    }

    cart.items = [];
    await cart.save();
    return { message: 'Cart cleared successfully' };
  }

  async findAbandonedCarts(): Promise<any[]> {
    return this.cartModel.aggregate([
      { $match: { items: { $ne: [] } } }, // Find carts with items
      { $group: { _id: "$user", cartCount: { $sum: 1 } } }, // Group by user and count carts
    ]);
  }

  // Count total number of carts
  async countCarts(): Promise<number> {
    return this.cartModel.countDocuments().exec();
  }

}
