import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(  process.env.MONGODB_URI ?? process.env.MONGO_URI ?? 'mongodb://mongo:27017/app'
),
    UsersModule,
    AuthModule
  ]
})
export class AppModule {}
