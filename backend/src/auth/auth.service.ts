import { BadRequestException, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserDto } from './Dto/userDto';
import { PrismaService } from './../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

  constructor(private readonly prismaService:PrismaService){}

  async signup(user: UserDto) {
        const userbyEmail = await this.prismaService.user.findFirst({
          where: { email: user.email },
        });

        if (userbyEmail) {
          throw new BadRequestException('Email Already exists');
        }

        const password = user.password;

        const saltOrRounds = 10;

        const hash = await bcrypt.hash(password, saltOrRounds);

        user.password = hash;
        
            const responseuser = await this.prismaService.user.create({
              data: {
                email: user.email,
                password: user.password,
                profilePhoto:'https://profilephoto.com'
              },
            });
          
            delete responseuser.password;
            return responseuser;
      
  }



}
