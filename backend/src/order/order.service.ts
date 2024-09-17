// order.service.ts
import {  Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model  } from 'mongoose';
import { Order, OrderDocument } from './order.schema';
import { Cart, CartDocument } from '../cart/cart.schema';
import { ProductsService } from '../products/products.service';
import { Product, ProductDocument } from '../products/product.schema';
import { EmailService } from '../utils/email.utils';
import { Address } from '../address/address.schema';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
    @InjectModel(Cart.name) private cartModel: Model<CartDocument>,
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
    private productService: ProductsService,
    private emailService: EmailService,
  ) {}

  

  async getOrderHistory(userId: string) {
    return this.orderModel.find({ user: userId, status: 'delivered' }).populate('items.product');
  }

  async getOrderStatus(userId: string) {
    return this.orderModel.find({ user: userId, status: { $ne: 'delivered' } }).populate('items.product');
  }

  async updateOrderStatus(orderId: string, status: string) {
    const order = await this.orderModel.findById(orderId);
    if (!order) throw new Error('Order not found');

    order.status = status;
    await order.save();

    // Send status update email
    await this.emailService.sendOrderEmail(order.user.toString(), status, order);

    return order;
  }


  async handlePaymentSuccess(userId: string, cartItems: any[], totalPrice: number, address: Address, paymentId: string) {
    const session = await this.orderModel.db.startSession();
    session.startTransaction();
  
    try {
      // Step 1: Create the order
      const order = await this.orderModel.create(
        [{
          user: userId,
          items: cartItems.map(item => ({
            product: item.product._id,
            quantity: item.quantity,
            price: item.product.price,
          })),
          total: totalPrice,
          address,
          paymentId,
          status: 'processing',
        }],
        { session },
      );
  
      // Step 2: Clear the cart
      await this.cartModel.updateOne(
        { user: userId },
        { $set: { items: [] } },
        { session },
      );
  
      // Commit the transaction
      await session.commitTransaction();
      session.endSession();

      for (const item of cartItems) {
        await this.productService.decreaseStock(item.product._id, item.quantity);
      }

      return order;
    } catch (error) {
      // Abort transaction if something goes wrong
      await session.abortTransaction();
      session.endSession();
      console.error('Transaction failed:', error);  // Log the error for debugging
      throw new Error('Failed to process order and clear cart');
    }
  }
  
  async getSellerOrders(sellerId: string) {
    try {
      // Step 1: Find all products that belong to the seller
      const sellerProducts = await this.productModel.find({ seller: sellerId }).select('_id');
      const productIds = sellerProducts.map(product => product._id);

      // Step 2: Find orders that contain the seller's products
      const orders = await this.orderModel.find({ 'items.product': { $in: productIds } })
        .populate('user', 'name email')  // Populate user info (name, email)
        .populate('items.product', 'name price')  // Populate product info (name, price)
        .sort({ createdAt: -1 });

      return orders;
    } catch (error) {
      throw new Error('Failed to fetch seller orders');
    }
  }


}
