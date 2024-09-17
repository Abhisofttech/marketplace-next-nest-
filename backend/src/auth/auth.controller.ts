import { Controller, Post, Body, Req, UnauthorizedException, Param } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ChangePasswordDto } from 'src/user/dto/change-password.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signUp(@Body() data: any) {
    return this.authService.signUp(data);
  }

  @Post('signin')
  signIn(@Body('email') email: string, @Body('password') password: string) {
    return this.authService.signIn(email, password);
  }

  @Post('change-password')
  async changePassword(
    @Body() changePasswordDto: ChangePasswordDto,
    @Req() req: any
  ) {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException('Token not provided');
    }

    return this.authService.changePassword(token, changePasswordDto.oldPassword, changePasswordDto.newPassword);
  }

  @Post('forgot-password')
  requestPasswordReset(@Body('email') email: string) {
    return this.authService.requestPasswordReset(email);
  }

  @Post('reset-password/:token')
  resetPassword(@Param('token') token: string, @Body('newPassword') newPassword: string) {
    return this.authService.resetPassword(token, newPassword);
  }
  

}
