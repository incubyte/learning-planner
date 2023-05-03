import { PrismaService } from '@Prisma/prisma.service';
import { UpdateUserDto } from '@User/dto/updateUser.dto';
import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { LeaderboardDto } from './dto/leaderboard.dto';
import { ProfileCourseDto } from './dto/profileCourse.dto';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async getUserById(id: string): Promise<User> {
    const user = await this.prismaService.user.findFirst({ where: { id } });
    delete user.password;
    return user;
  }

  async getCourseByUserId(
    userid: string,
    status: string,
  ): Promise<ProfileCourseDto> {
    const prismaUserCourse = await this.prismaService.userCourse.findMany({
      where: {
        userId: userid,
        isCompleted:
          status === 'completed'
            ? true
            : status === 'active'
            ? false
            : undefined,
      },
    });
    const completedCourseCount = prismaUserCourse.filter(
      (userCourse) => userCourse.isCompleted === true,
    ).length;
    const courseIds = prismaUserCourse.map(
      (currentUserCourse) => currentUserCourse.courseId,
    );
    const courses = await Promise.all(
      await this.prismaService.course.findMany({
        where: {
          id: {
            in: courseIds,
          },
        },
      }),
    );
    const courseDto = new ProfileCourseDto();
    courseDto.courses = courses;
    courseDto.count = completedCourseCount;
    return courseDto;
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

    const userIds = userCourse.map(
      (currentUserCourse) => currentUserCourse.userId,
    );
    const users = await this.prismaService.user.findMany({
      where: {
        id: {
          in: userIds,
        },
      },
    });

    return users.map((user) => {
      const userCourseCount = userCourse.find(
        (currentUserCourse) => currentUserCourse.userId === user.id,
      );
      return {
        user: user,
        CompletedCourseCount: userCourseCount._count.courseId,
      };
    });
  }

  enrollCourse(id: string, courseId: string) {
    throw new Error('Method not implemented.');
  }
}
