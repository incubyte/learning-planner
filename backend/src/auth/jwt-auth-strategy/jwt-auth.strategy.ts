import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config/dist';
import { PassportStrategy } from '@nestjs/passport';
import { BearerStrategy } from 'passport-azure-ad';

@Injectable()
export class jwtAuthStrategy extends PassportStrategy(
  BearerStrategy,
  'azure-ad',
) {
  constructor(configService: ConfigService) {
    console.log('CALLED');
    super({
      identityMetadata: `https://login.microsoftonline.com/05b07524-f2af-411a-b5a9-a5fee6228712/v2.0/.well-known/openid-configuration`,
      clientID: 'e7b861be-ba37-4cef-9d07-c0c184cb681f',
      // passReqToCallBack: false,
      responseType: 'id_token',
      responseMode: 'query',
      redirectUrl: 'https://localhost:3000/',

      // jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // ignoreExpiration: false,

      // secretOrKey: configService.get('SECRET_KEY'),
    });
  }

  validate(payload: any) {
    console.log('CALLED');
    return payload;
  }
}
