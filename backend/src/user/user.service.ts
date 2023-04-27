import { PrismaService } from '@Prisma/prisma.service';
import { UpdateUserDto } from '@User/dto/updateUser.dto';
import { Injectable, NotImplementedException } from '@nestjs/common';
import { Course, User } from '@prisma/client';
import { LeaderboardDto } from './dto/leaderboard.dto';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async getUserById(id: string): Promise<User> {
    const user = await this.prismaService.user.findFirst({ where: { id } });
    delete user.password;
    return user;
  }

  async getCourseByUserId(userid: string, status: string): Promise<Course[]> {
    if (status === 'completed') {
      const prismaUserCourse = await this.prismaService.userCourse.findMany({
        where: { userId: userid, isCompleted: true },
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
    } else if (status === 'active') {
      const prismaUserCourse = await this.prismaService.userCourse.findMany({
        where: { userId: userid, isCompleted: false },
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

  async updateProfile(
    updatedUser: UpdateUserDto,
    userid: string,
  ): Promise<User> {
    const updatedPrismaUser = await this.prismaService.user.update({
      where: { id: userid },
      data: { ...updatedUser },
    });
    delete updatedPrismaUser.password;
    return updatedPrismaUser;
  }

  async getLeaderboard(): Promise<LeaderboardDto[]> {
    const userCourse = await this.prismaService.userCourse.groupBy({
      by: ['userId'],
      where: {
        isCompleted: true,
      },
      _count: {
        courseId: true,
      },
      take: 5,
      orderBy: {
        _count: {
          courseId: 'desc',
        },
      },
    });

    const users = await Promise.all(
      userCourse.map(async (currentUserCourse) => {
        return {
          user: await this.prismaService.user.findFirst({
            where: {
              id: currentUserCourse.userId,
            },
          }),
          count: currentUserCourse._count.courseId,
        };
      }),
    );
    return users;
  }
}
