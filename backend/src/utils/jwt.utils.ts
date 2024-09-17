import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtUtils {
  constructor(private readonly jwtService: JwtService) {}

 

  verifyToken(token: string): any {
    return this.jwtService.verify(token);
  }
}
