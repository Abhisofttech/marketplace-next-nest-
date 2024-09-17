import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const frontendUrl = process.env.FRONTEND_URL

  app.enableCors({
    origin:frontendUrl,
    methods:'GET,POST,PUT,DELETE, PATCH',
credentials:true
  })
  await app.listen(3001);
}

bootstrap();
