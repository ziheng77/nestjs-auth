import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {join} from 'path';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService)
  const port = configService.get<string>('LISTEN_HOST'); // 自定义端口
  const host = configService.get<string>('LISTEN_PORT');; // 自定义 IP 地址
  await app.listen(port, host);
  console.log(`Application is running on http://${host}:${port}`);
  // test database

}
bootstrap();
