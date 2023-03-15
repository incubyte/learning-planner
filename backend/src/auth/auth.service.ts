import { Injectable } from '@nestjs/common';
import { UserDto } from './Dto/userDto';
import { PrismaService } from './../prisma/prisma.service';

@Injectable()
export class AuthService {

  constructor(private readonly prismaService:PrismaService){}

  async signup(user: UserDto) {
     const responseuser = await this.prismaService.user.create({
       data: {
         email: user.email,
         password: user.password,
         profilePhoto:'https://profilephoto.com'
       },
     });

     return responseuser;
  }


}
