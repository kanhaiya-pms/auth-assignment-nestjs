import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forRoot('mongodb+srv://kanhaiyakseeksolution:V551GNP2XqoYDGcV@cluster0.cwurlew.mongodb.net/assignment'),
    UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

