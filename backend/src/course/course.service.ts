import { PrismaService } from '@Prisma/prisma.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { Course } from '@prisma/client';
import { CourseDto } from './dto/course.dto';
import { updateCourseDto } from './dto/updateCourse.dto';

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

  async createCourse(course: CourseDto): Promise<Course> {
    try {
      const responseCourse = await this.prismaService.course.create({
        data: {
          name: course.name,
          resourseUrls: course.resourseUrls,
          testUrls: course.testUrls,
          description: course.description,
          imageUrl: course.imageUrl,
          tags: course.tags,
          credit: 10,
        },
      });
      return responseCourse;
    } catch (e) {
      throw new BadRequestException('Course already present');
    }
  }

  async updateCourse(
    id: string,
    updateCourse: updateCourseDto,
  ): Promise<Course> {
    const prismaUpdateCourse = await this.prismaService.course.findFirst({
      where: { id: id },
    });
    if (prismaUpdateCourse == null) {
      throw new BadRequestException('Course does not exists');
    }
    const updateCourseResponse = await this.prismaService.course.update({
      where: { id: id },
      data: { ...updateCourse },
    });
    return updateCourseResponse;
  }
}
