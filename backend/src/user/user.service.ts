import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Course, User } from '@prisma/client';
import { UpdateUserDto } from './dto/updateUser.dto';

@Injectable()
export class UserService {
  updateProfile(
    updatedUser: UpdateUserDto,
    userid: string,
  ): User | PromiseLike<User> {
    throw new Error('Method not implemented.');
  }
  constructor(private readonly prismaService: PrismaService) {}
  async getUserById(id: string): Promise<User> {
    const user = await this.prismaService.user.findFirst({ where: { id } });
    delete user.password;
    return user;
  }

  async getCourseByUserId(userid: string): Promise<Course[]> {
    const prismaUserCourse = await this.prismaService.userCourse.findMany({
      where: { userId: userid },
    });
    const courses = await Promise.all(
      prismaUserCourse.map(async (currentUserCourse) => {
        return await this.prismaService.course.findFirst({
          where: {
            id: currentUserCourse.courseId,
          },
        });
      }),
    );
    return courses;
  }
}