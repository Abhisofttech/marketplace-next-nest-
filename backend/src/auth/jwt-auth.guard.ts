import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;
    if (!authHeader) throw new UnauthorizedException('Token not found');

    const token = authHeader.split(' ')[1];
    try {
      const user = await this.jwtService.verifyAsync(token);
      request.user = user; // Attach user to request
      return true;
    } catch (err) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
