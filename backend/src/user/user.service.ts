import { PrismaService } from '@Prisma/prisma.service';
import { UpdateUserDto } from '@User/dto/updateUser.dto';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User, UserCourse } from '@prisma/client';
import { LeaderboardDto } from './dto/leaderboard.dto';
import { ProfileCourseDto } from './dto/profileCourse.dto';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  isUserEnrolledInCourse(prismaUserCourse: UserCourse) {
    return prismaUserCourse !== null;
  }

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

  async enrollCourse(userId: string, courseId: string): Promise<UserCourse> {
    const userCourse = await this.prismaService.userCourse.findFirst({
      where: {
        userId: userId,
        courseId: courseId,
      },
    });
    if (this.isUserEnrolledInCourse(userCourse)) {
      throw new BadRequestException('User has already enrolled in this course');
    }
    const prismaEnrolledUserCourse = await this.prismaService.userCourse.create(
      {
        data: {
          userId: userId,
          courseId: courseId,
          isCompleted: false,
        },
      },
    );
    return prismaEnrolledUserCourse;
  }

  async completeCourse(userId: string, courseId: string): Promise<UserCourse> {
    const userCourse = await this.prismaService.userCourse.findFirst({
      where: {
        userId: userId,
        courseId: courseId,
      },
    });
    if (!userCourse) {
      throw new NotFoundException('user or course not found');
    }
    if (userCourse.isCompleted) {
      throw new BadRequestException('Course already completed');
    }
    const updatedUserCourse = await this.prismaService.userCourse.update({
      where: {
        id: userCourse.id,
      },
      data: {
        isCompleted: true,
      },
    });
    return updatedUserCourse;
  }
}
