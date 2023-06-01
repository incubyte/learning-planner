import { AuthController } from '@Auth/auth.controller';
import { AuthService } from '@Auth/auth.service';
import { jwtAuthStrategy } from '@Auth/jwt-auth-strategy/jwt-auth.strategy';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          secret: configService.get('SECRET_KEY'),
          signOptions: {
            expiresIn: '180mins',
          },
        };
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, jwtAuthStrategy],
})
export class AuthModule {}
