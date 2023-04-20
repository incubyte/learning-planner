import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}
  async getUserById(id: string): Promise<User> {
    const user = await this.prismaService.user.findFirst({ where: { id } });
    delete user.password;
    return user;
  }
}
