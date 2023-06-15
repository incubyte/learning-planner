import { UserDto } from '@Auth/dto/user.dto';
import { PrismaService } from '@Prisma/prisma.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { compareSync } from 'bcrypt';
import { Role } from './role.enum';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  checkUserExist(prismaUser: User) {
    return prismaUser !== null;
  }

  async signup(user: UserDto): Promise<User> {
    const prismaUser = await this.prismaService.user.findFirst({
      where: { email: user.email },
    });
    if (this.checkUserExist(prismaUser)) {
      throw new BadRequestException('Email Already exists');
    }
    const password = user.password;
    const saltOrRounds = 10;
    const hash = bcrypt.hashSync(password, saltOrRounds);
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

  async signin(user: UserDto): Promise<string> {
    const prismaUser = await this.prismaService.user.findFirst({
      where: { email: user.email },
    });
    if (!this.checkUserExist(prismaUser)) {
      throw new BadRequestException('User not found');
    }
    if (!compareSync(user.password, prismaUser.password)) {
      throw new BadRequestException('Invalid password');
    }
    const accessToken = this.jwtService.sign({
      id: prismaUser.id,
      email: user.email,
      roles: prismaUser.roles,
    });
    return accessToken;
  }

  async signinAdmin(user: UserDto): Promise<string> {
    const prismaUser = await this.prismaService.user.findFirst({
      where: { email: user.email, roles: Role.Admin },
    });
    if (!this.checkUserExist(prismaUser)) {
      throw new BadRequestException('Admin not found');
    }
    if (!compareSync(user.password, prismaUser.password)) {
      throw new BadRequestException('Invalid password');
    }
    const accessToken = this.jwtService.sign({
      id: prismaUser.id,
      email: user.email,
      roles: prismaUser.roles,
    });
    return accessToken;
  }
}
