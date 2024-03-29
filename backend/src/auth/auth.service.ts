import { UserDto } from '@Auth/dto/user.dto';
import { PrismaService } from '@Prisma/prisma.service';
import { MailerService } from '@nestjs-modules/mailer';
import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { uid } from 'uid';
import { Role } from './role.enum';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
    private readonly mailerService: MailerService,
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

  async signin(user: any): Promise<string> {
    const prismaUser = await this.prismaService.user.findFirst({
      where: { email: user },
    });
    if (!this.checkUserExist(prismaUser)) {
      throw new BadRequestException('User not found');
    }
    const accessToken = this.jwtService.sign({
      id: prismaUser.id,
      email: user,
      roles: prismaUser.roles,
    });
    return accessToken;
  }

  async signinAdmin(user: UserDto): Promise<string> {
    const prismaUser = await this.prismaService.user.findFirst({
      where: { email: user.email },
    });
    if (!this.checkUserExist(prismaUser)) {
      throw new BadRequestException('Not an Admin');
    }
    const accessToken = this.jwtService.sign({
      id: prismaUser.id,
      email: user.email,
      roles: prismaUser.roles,
    });
    return accessToken;
  }

  async forgotPasswordAdmin(useremail: string): Promise<string> {
    const prismaUser = await this.prismaService.user.findFirst({
      where: { email: useremail, roles: Role.Admin },
    });
    if (!this.checkUserExist(prismaUser)) {
      throw new BadRequestException('User not found');
    }
    const token = uid(21);
    try {
      await this.mailerService.sendMail({
        to: useremail,
        from: 'a.learningplanner@gmail.com',
        subject: 'Reset Password LearningPlanner@Incubyte',
        html: `<p>click <a href="https://admin-incubyte-learningplanner.netlify.app/auth/reset_password/${token}"> here </a> to reset your password</p>`,
      });

      await this.prismaService.forgotPassword.create({
        data: { email: useremail, token: token },
      });
      return 'email sent';
    } catch (e) {
      throw new BadRequestException('Something wrong please try again');
    }
  }

  async resetPassword(token: string, userPassword: string): Promise<string> {
    const forgotPasswordToken =
      await this.prismaService.forgotPassword.findFirst({
        where: { token: token },
      });

    if (!forgotPasswordToken) {
      throw new BadRequestException('User not found, Please try again');
    }

    await this.prismaService.forgotPassword.deleteMany({
      where: { token: token },
    });
    const saltOrRounds = 10;
    const hash = bcrypt.hashSync(userPassword, saltOrRounds);

    await this.prismaService.user.update({
      where: { email: forgotPasswordToken.email },
      data: { password: hash },
    });

    return 'password changed';
  }
  async forgotPassword(useremail: string): Promise<string> {
    const prismaUser = await this.prismaService.user.findFirst({
      where: { email: useremail },
    });
    if (!this.checkUserExist(prismaUser)) {
      throw new BadRequestException('User not found');
    }
    const token = uid(21);
    try {
      await this.mailerService.sendMail({
        to: useremail,
        from: 'a.learningplanner@gmail.com',
        subject: 'Reset Password LearningPlanner@Incubyte',
        html: `<p>click <a href="https://incubyte-learningplanner.netlify.app/auth/reset_password/${token}">here </a>to reset your password</p>`,
      });

      await this.prismaService.forgotPassword.create({
        data: { email: useremail, token: token },
      });
      return 'email sent';
    } catch (e) {
      throw new BadRequestException('Something wrong please try again');
    }
  }
}
