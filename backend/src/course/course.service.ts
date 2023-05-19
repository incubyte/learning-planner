import { PrismaService } from '@Prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Course } from '@prisma/client';

@Injectable()
export class CourseService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAll(): Promise<Course[]> {
    return await this.prismaService.course.findMany();
  }

  async getById(id: string): Promise<Course> {
    return await this.prismaService.course.findFirst({ where: { id } });
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

  createCourse(createCourse: any): Promise<Course> {
    throw new Error('Method not implemented.');
  }
}
