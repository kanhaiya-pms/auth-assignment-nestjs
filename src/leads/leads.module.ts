import { Module } from '@nestjs/common';
import { LeadsService } from './leads.service';
import { LeadsController } from './leads.controller';
import { Leads, LeadsSchema } from './schema/leads.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Users, UsersSchema } from 'src/users/schema/users.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Leads.name, schema: LeadsSchema }]),
  MongooseModule.forFeature([{ name: Users.name, schema: UsersSchema }]),
],
  controllers: [LeadsController],
  providers: [LeadsService],
})
export class LeadsModule {}
