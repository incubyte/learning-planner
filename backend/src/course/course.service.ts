import { PrismaService } from '@Prisma/prisma.service';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Course, Tag } from '@prisma/client';
import { CourseDto } from './dto/course.dto';
import { updateCourseDto } from './dto/updateCourse.dto';

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

  async getTagsByCourseId(id: string): Promise<Tag[]> {
    const result = await this.prismaService.course.findFirst({ where: { id } });
    if (!result) {
      throw new NotFoundException('Course Not Found');
    }
    const responseCourseTagIds = await this.prismaService.courseTag.findMany({
      where: {
        courseId: id,
      },
      select: {
        tagId: true,
      },
    });

    const tagIds = responseCourseTagIds.map(
      (currentCourseTag) => currentCourseTag.tagId,
    );

    return await this.prismaService.tag.findMany({
      where: {
        id: {
          in: tagIds,
        },
      },
    });
  }

  async filterByTags(tags: string[]): Promise<Course[]> {
    const intTags: number[] = [];
    for (let i = 0; i < tags.length; i++) {
      intTags.push(+tags[i]);
    }
    const courseTag = await this.prismaService.courseTag.groupBy({
      by: ['courseId'],
      where: {
        tagId: {
          in: intTags,
        },
      },
      having: {
        courseId: {
          _count: {
            equals: tags.length,
          },
        },
      },
    });

    const courseIds = courseTag.map(
      (currentCourseTag) => currentCourseTag.courseId,
    );

    return await this.prismaService.course.findMany({
      where: {
        id: {
          in: courseIds,
        },
      },
    });
  }

  async filterPopularCourseByTags(tags: string[]):Promise<Course[]>{
    throw new Error('Method not implemented.');
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
          credit: 10,
        },
      });

      await course.tags?.map(async (tag) => {
        await this.prismaService.courseTag.createMany({
          data: {
            courseId: responseCourse.id,
            tagId: tag,
          },
        });
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
    if (!prismaUpdateCourse) {
      throw new NotFoundException('Course does not exists');
    }
    const updateCourseResponse = await this.prismaService.course.update({
      where: { id: id },
      data: {
        resourseUrls: updateCourse.resourseUrls,
        imageUrl: updateCourse.imageUrl,
        testUrls: updateCourse.testUrls,
        credit: updateCourse.credit,
        description: updateCourse.description,
      },
    });

    if (updateCourse.tags) {
      await this.prismaService.courseTag.deleteMany({
        where: {
          courseId: id,
        },
      });

      const tagData = [];

      updateCourse.tags.map(async (tag) => {
        tagData.push({ courseId: id, tagId: tag });
      });

      await this.prismaService.courseTag.createMany({ data: tagData });
    }
    return updateCourseResponse;
  }

  async deleteCourse(id: string): Promise<string> {
    const prismadeleteCourse = await this.prismaService.course.findFirst({
      where: { id: id },
    });

    if (!prismadeleteCourse) {
      throw new NotFoundException('Course does not exists');
    }

    const deleteCourseResponse = await this.prismaService.course.delete({
      where: { id: id },
    });
    if (!deleteCourseResponse) {
      throw new BadRequestException('Some problem occured');
    }
    return 'Course deleted Successfully';
  }
}
