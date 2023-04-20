import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Course, User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}
  async getUserById(id: string): Promise<User> {
    return await this.prismaService.user.findFirst({ where: { id } });
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
