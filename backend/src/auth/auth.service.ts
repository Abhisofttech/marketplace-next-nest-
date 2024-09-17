

import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/user.schema';
import { EmailService } from 'src/utils/email.utils';
import { generateResetToken } from 'src/utils/token.utils';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly emailService: EmailService,
  ) {}

  async signUp(data: any): Promise<{ token: string; user: User }> {
    // Create a new user using the userService
    const user = await this.userService.createUser(data);
    
    // Generate the JWT token
    const token = this.generateToken(user);
    
    // Return both the token and the user data
    return { token, user };
  }

  async signIn(email: string, password: string): Promise<{ token: string; user: User }> {
    // Find the user by email
    const user = await this.userService.findUserByEmail(email);
    
    // If user is not found, throw an exception
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Validate the password
    const isPasswordValid = await this.userService.validatePassword(user, password);
    
    // If password is invalid, throw an exception
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Generate the JWT token
    const token = this.generateToken(user);
    
    // Return both the token and the user data
    return { token, user };
  }

  async changePassword(token: string, oldPassword: string, newPassword: string): Promise<string> {
    const decodedToken = this.jwtService.verify(token);
    const email = decodedToken.email;
    
    await this.userService.changePassword(email, oldPassword, newPassword);
    
    return 'Password updated successfully';
  }

  async requestPasswordReset(email: string): Promise<void> {
    const user = await this.userService.findUserByEmail(email);
    const resetToken = generateResetToken();
    await this.userService.setResetToken(email, resetToken);
    await this.emailService.sendPasswordResetEmail(email, resetToken);
  }

  async resetPassword(token: string, newPassword: string): Promise<void> {
    const user = await this.userService.findUserByToken(token);
    await this.userService.updatePassword(user, newPassword);
  }

  // Helper function to generate a JWT token with the user details
  generateToken(user: User): string {
    const payload = { id: user._id, email: user.email, role: user.role };
    return this.jwtService.sign(payload);
  }
}
