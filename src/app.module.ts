import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    // ConfigModule.forRoot({
    //   isGlobal: true,
    // }),
    MongooseModule.forRoot("mongodb+srv://kanhaiyakseeksolution:V551GNP2XqoYDGcV@cluster0.cwurlew.mongodb.net/assignment-v1"),
    UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

