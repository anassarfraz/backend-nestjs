import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import typeOrmConfig from './../typeorm.config';
import { JwtModule } from '@nestjs/jwt';
import { TaskModule } from './task/task.module';
import { UserModule } from './user/user.module';
import config from './config/config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => typeOrmConfig,
    }),
    JwtModule.register({
      secret: config.jwtSecret,
      signOptions: { expiresIn: '5h' },
    }),
    TaskModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
