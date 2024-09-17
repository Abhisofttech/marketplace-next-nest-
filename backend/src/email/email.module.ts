// email/email.module.ts
import { Module } from '@nestjs/common';
import { EmailService } from '../utils/email.utils';
import { UserModule } from 'src/user/user.module';

@Module({
  imports:[UserModule],
  providers: [EmailService],
  exports: [EmailService], // Export the service to use it in other modules
})
export class EmailModule {}
