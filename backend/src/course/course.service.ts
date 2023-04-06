import { PrismaService } from '@/prisma/prisma.service';
import { Injectable, NotImplementedException } from '@nestjs/common';
import { CourseDto } from './dto/course.dto';

@Injectable()
export class CourseService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAll(): Promise<CourseDto[]> {
    return await this.prismaService.course.findMany();
  }

  async getById(id: string): Promise<CourseDto> {
    return await this.prismaService.course.findFirst({ where: { id } });
  }

  async filterByTags(tags: string[]): Promise<CourseDto[]> {
    throw new NotImplementedException();
  }
}
