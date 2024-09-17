import { Injectable, ConflictException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';
import { hashPassword, comparePassword } from '../utils/password.utils';
import { UpdateAddressDto } from './dto/update-address.dto';
import { UpdateUserInfoDto } from './dto/update-user-info.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async createUser(data: any): Promise<User> {
    const { name, email, password, role, phoneNumber } = data;
    
    // Check if user already exists
    const existingUser = await this.userModel.findOne({ email });
    if (existingUser) {
      throw new ConflictException('User already exists');
    }

    // Hash the password
    const hashedPassword = await hashPassword(password);

    // Create and save the new user with all the fields
    const newUser = new this.userModel({ 
      name, 
      email, 
      password: hashedPassword, 
      role, 
      phoneNumber 
    });
    return newUser.save();
  }

  async findUserByEmail(email: string): Promise<User> {
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async changePassword(email: string, oldPassword: string, newPassword: string): Promise<void> {
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isOldPasswordValid = await comparePassword(oldPassword, user.password);
    if (!isOldPasswordValid) {
      throw new UnauthorizedException('Current password is incorrect');
    }

    const hashedNewPassword = await hashPassword(newPassword);
    user.password = hashedNewPassword;
    await user.save();
  }

async setResetToken(email: string, token: string): Promise<void> {
    await this.userModel.updateOne({ email }, { resetToken: token });
  }

  async findUserByToken(token: string): Promise<User> {
    const user = await this.userModel.findOne({ resetToken: token });
    if (!user) {
      throw new NotFoundException('Invalid or expired token');
    }
    return user;
  }

  async updatePassword(user: User, newPassword: string): Promise<User> {
    const hashedPassword = await hashPassword(newPassword);
    user.password = hashedPassword;
    user.resetToken = null; // Clear the reset token after use
    return user.save();
  }

  async validatePassword(user: User, password: string): Promise<boolean> {
    return comparePassword(password, user.password);
  }

  async getUserById(userId: string): Promise<User> {
    const user = await this.userModel.findById(userId).exec();
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  
  async updateAddress(userId: string, updateAddressDto: UpdateAddressDto): Promise<User> {
    const user = await this.getUserById(userId);

    // Update address
    user.address = updateAddressDto;
    
    return user.save();
  }

  async updateUserInfo(userId: string, updateUserInfoDto: UpdateUserInfoDto): Promise<User> {
    const user = await this.getUserById(userId);
    if (updateUserInfoDto.name) user.name = updateUserInfoDto.name;
    if (updateUserInfoDto.phoneNumber) user.phoneNumber = updateUserInfoDto.phoneNumber;
    return user.save();
  }
}
