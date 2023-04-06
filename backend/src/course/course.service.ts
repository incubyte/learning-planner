import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CourseDto } from './dto/course.dto';

@Injectable()
export class CourseService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAll(): Promise<CourseDto[]> {
    return this.prismaService.course.findMany();
  }
}
