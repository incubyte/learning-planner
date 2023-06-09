import { PrismaService } from '@Prisma/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Course } from '@prisma/client';

@Injectable()
export class CourseService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAll(): Promise<Course[]> {
    return await this.prismaService.course.findMany();
  }

  async getById(id: string): Promise<Course> {
    const result = await this.prismaService.course.findFirst({ where: { id } });
    if (!result) {
      throw new NotFoundException('Course Not Found');
    }
    return result;
  }

  async filterByTags(tags: string[]): Promise<Course[]> {
    const intTags: number[] = [];
    for (let i = 0; i < tags.length; i++) {
      intTags.push(+tags[i]);
    }
    return await this.prismaService.course.findMany({
      where: {
        tags: {
          hasEvery: intTags,
        },
      },
    });
  }

  async getPopularCourse(): Promise<Course[]> {
    const userCourse = await this.prismaService.userCourse.groupBy({
      by: ['courseId'],
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

    const courseIds = userCourse.map(
      (currentUserCourse) => currentUserCourse.courseId,
    );

    const courses = await this.prismaService.course.findMany({
      where: {
        id: {
          in: courseIds,
        },
      },
    });

    return courses;
  }
}
