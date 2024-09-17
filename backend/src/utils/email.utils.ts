

import { Injectable } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { UserService } from '../user/user.service'; // Import UserService
import nodemailer = require('nodemailer');

@Injectable()
export class EmailService {
  private transporter = nodemailer.createTransport({
    service: 'Gmail', // Or any other email service
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Inject UserService
  constructor(@Inject(UserService) private readonly userService: UserService) {}

  async sendPasswordResetEmail(email: string, token: string): Promise<void> {
    const resetLink = `${process.env.FRONTEND_URL}/reset-password/${token}`;
    
    await this.transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Password Reset',
      html: `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`,
    });
  }

  async sendOrderEmail(userId: string, status: string, order: any) {
    const user = await this.userService.getUserById(userId); // Use injected userService
    let subject, text;

    if (status === 'orderPlaced') {
      subject = 'Order Confirmation';
      text = `Your order has been placed successfully. Order ID: ${order._id}`;
    } else if (status === 'shipped') {
      subject = 'Order Shipped';
      text = `Your order has been shipped. Order ID: ${order._id}`;
    } else if (status === 'delivered') {
      subject = 'Order Delivered';
      text = `Your order has been delivered. Order ID: ${order._id}`;
    }

    await this.transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: user.email,
      subject,
      text,
    });
  }
}
