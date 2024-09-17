import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from './user.service';
import { UserSchema } from './user.schema';
import { UserController } from './user.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),  // Register the User schema
    forwardRef(() => AuthModule)
  ],
  providers: [UserService],
  exports: [UserService],
  controllers: [UserController],  // Export so it can be used in AuthModule
})
export class UserModule {}
