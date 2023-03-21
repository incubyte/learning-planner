import { BadRequestException, Injectable } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { PrismaService } from './../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(private readonly prismaService: PrismaService) {}

  checkUserExist(prismaUser: User) {
    return prismaUser !== null;
  }

  async signup(user: UserDto) {
    const prismaUser = await this.prismaService.user.findFirst({
      where: { email: user.email },
    });

    if (this.checkUserExist(prismaUser)) {
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
        profilePhoto: 'https://profilephoto.com',
      },
    });

    delete responseuser.password;
    return responseuser;
  }
}
