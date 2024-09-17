import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
// import { JwtStrategy } from './jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EmailModule } from 'src/email/email.module';

@Module({
  imports: [
    PassportModule,
    // ConfigModule,
    
    ConfigModule.forRoot(), // Ensure this is present to load .env file
    JwtModule.register({
      secret: process.env.JWT_SECRET, // Directly use process.env to access the secret
      signOptions: { expiresIn: '1h' },
    }),
    forwardRef(() => UserModule),
    UserModule, 
    EmailModule // Import UserModule for user-related logic
  ],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService,  JwtModule],
})
export class AuthModule {}
