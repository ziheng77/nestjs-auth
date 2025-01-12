import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { readFile, readFileSync } from 'fs';
import {join} from 'path';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports:[
    PassportModule,
    JwtModule.registerAsync({
      imports:[ConfigModule],

      useFactory: async (configService: ConfigService) => ({
        privateKey: {
          key:readFileSync(join(__dirname,'keys','private.key'),'utf-8'),
          passphrase: configService.get<string>('JWT_PRIVATE_KEY_PASSPHRASE')
        },
        publicKey: readFileSync(join(__dirname,'keys','public.key'),'utf-8'),
        signOptions: {
          algorithm: 'RS256',
          expiresIn: '1h'
        },
      }),
      inject: [ConfigService]
    }),
    UserModule,
  ],
  providers: [AuthService, JwtStrategy],
  exports:[AuthService]
})
export class AuthModule {}
