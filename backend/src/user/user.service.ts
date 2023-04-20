import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Course, User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}
  async getUserById(id: string): Promise<User> {
    return await this.prismaService.user.findFirst({ where: { id } });
  }

  getCourseByUserId(userid: string): Promise<Course[]> {
    throw new Error('Method not implemented.');
  }
}
