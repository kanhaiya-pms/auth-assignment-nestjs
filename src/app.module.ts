import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { LeadsModule } from './leads/leads.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    // MongooseModule.forRoot("mongodb+srv://kanhaiyakseeksolution:V551GNP2XqoYDGcV@cluster0.cwurlew.mongodb.net/assignment-v1"),
    MongooseModule.forRoot(process.env.MONGO_DB_URI),
    UsersModule,
    LeadsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

