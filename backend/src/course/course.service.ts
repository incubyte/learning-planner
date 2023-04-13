import { PrismaService } from '@/prisma/prisma.service';
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

  async filterByTags(tags: number[]): Promise<Course[]> {
    return await this.prismaService.course.findMany({
      where: {
        tags: {
          hasEvery: tags,
        },
      },
    });
  }
}
