import { BadRequestException, Injectable} from '@nestjs/common';
import { UserDto } from './Dto/userDto';
import { PrismaService } from './../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { compareSync } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly prismaService: PrismaService, private readonly jwtService : JwtService) {}

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
        profilePhoto: 'https://profilephoto.com',
      },
    });

    delete responseuser.password;
    return responseuser;
  }

  async signin(user: UserDto) : Promise<string> {

        const userByEmail = await this.prismaService.user.findFirst({
          where: { email: user.email },
        });
        
        if (!userByEmail) {
          throw new BadRequestException('User not found');
        }

        if (!compareSync(user.password, userByEmail.password)) {
          throw new BadRequestException('Invalid password');
        }

        const accessToken = await this.jwtService.signAsync({
          id: userByEmail.id,
          email: user.email,
        });

        return accessToken ;
  }
}
