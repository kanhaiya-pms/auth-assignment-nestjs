import { Module } from '@nestjs/common';
import { LeadsService } from './leads.service';
import { LeadsController } from './leads.controller';
import { Leads, LeadsSchema } from './schema/leads.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name: Leads.name, schema: LeadsSchema }])],
  controllers: [LeadsController],
  providers: [LeadsService],
})
export class LeadsModule {}
