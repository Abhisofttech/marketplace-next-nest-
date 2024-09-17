import { Controller, Get, Patch, Body, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard'; // Ensure you have JWT guard implemented
import { UserService } from './user.service';
import { UpdateAddressDto } from './dto/update-address.dto';
import { UpdateUserInfoDto } from './dto/update-user-info.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard) // Ensure you have a JWT auth guard to validate tokens
  @Get('user-detail')
  async getUserDetails(@Req() req: any) {
    const userId = req.user.id; 
    return this.userService.getUserById(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('update-address')
  async updateAddress(@Req() req: any, @Body() updateAddressDto: UpdateAddressDto) {
    const userId = req.user.id;
    console.log(userId)
    return this.userService.updateAddress(userId, updateAddressDto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('update-userInfo')
  async updateUserInfo(@Req() req: any, @Body() updateUserInfoDto: UpdateUserInfoDto) {
    const userId = req.user.id;
    return this.userService.updateUserInfo(userId, updateUserInfoDto);
  }
}
