import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { User } from './entities/user.entity';
import { UserModule } from './user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    /*
    {
      type:'mysql',
      host:'localhost',
      port:3306,
      username:'root',
      password:'adminjson864',
      database: 'nestjs_auth',
      entities: [User],
      synchronize: true,
    }
    */
    TypeOrmModule.forRootAsync({
      imports:[ConfigModule],
      
      useFactory: (configService:ConfigService) => ({
        type: configService.get<any>('DB_TYPE') as 'aurora-mysql',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        entities: [User], // 注册实体
        synchronize: true, // 自动同步数据库结构（仅用于开发环境）
      }),
      inject:[ConfigService]
    }),
    AuthModule,
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
