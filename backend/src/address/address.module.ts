import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AddressSchema } from './address.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Address', schema: AddressSchema }])],
  exports: [MongooseModule],  // Export if other modules need to use the address schema
})
export class AddressModule {}
