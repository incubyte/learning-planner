import { PrismaService } from '@Prisma/prisma.service';
import { UpdateUserDto } from '@User/dto/updateUser.dto';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User, UserCourse } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { AddUserDto } from './dto/addUser.dto';
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

    return userCourse.map((Course) => {
      const user = users.find(
        (currentUserCourse) => currentUserCourse.id === Course.userId,
      );
      return {
        user: user,
        CompletedCourseCount: Course._count.courseId,
      };
    });
  }

  async enrollCourse(userId: string, courseId: string): Promise<UserCourse> {
    const course = await this.prismaService.course.findFirst({
      where: {
        id: courseId,
      },
    });
    if (!course) {
      throw new NotFoundException('course not found');
    }
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

  async getStatusOfCourse(userId: string, courseId: string): Promise<number> {
    const userCourse = await this.prismaService.userCourse.findFirst({
      where: {
        userId: userId,
        courseId: courseId,
      },
    });

    if (!userCourse) {
      return 0;
    }
    return userCourse.isCompleted ? 2 : 1;
  }

  async addUser(users: AddUserDto[]): Promise<number> {
    const userData = [];

    for (let i = 0; i < users.length; i++) {
      const password = 'Incubyte' + '@' + Math.floor(Math.random() * 1000);
      const saltOrRounds = 10;
      const hash = bcrypt.hashSync(password, saltOrRounds);
      userData.push({
        ...users[i],
        password: hash,
        profilePhoto:
          'https://res.cloudinary.com/dxepcudkt/image/upload/v1684320851/logo_wkuxqf.jpg',
      });
    }
    try {
      const result = await this.prismaService.user.createMany({
        data: userData,
      });
      return result.count;
    } catch (e) {
      throw new BadRequestException('User(s) Already Exists');
    }
  }

  async updateUser(updateUser: UpdateUserDto, id: string): Promise<User> {
    const user = await this.prismaService.user.findFirst({
      where: {
        id: id,
      },
    });

    if (!user) {
      throw new NotFoundException('user not found');
    }

    return await this.prismaService.user.update({
      where: { id },
      data: { ...updateUser },
    });
  }

  async deleteUser(id: string) {
    const user = await this.prismaService.user.findFirst({
      where: {
        id: id,
      },
    });

    if (!user) {
      throw new NotFoundException('user not found');
    }
    try {
      return await this.prismaService.user.delete({
        where: { id },
      });
    } catch (e) {
      throw new BadRequestException('Something wrong');
    }
  }

  async getAll(): Promise<User[]> {
    return await this.prismaService.user.findMany();
  }
}
