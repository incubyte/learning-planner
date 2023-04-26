import { JwtAuthGuard } from '@Auth/jwt-auth-guard/jwt-auth.guard';
import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { Course } from '@prisma/client';
import { CourseService } from '@Course/course.service';

@UseGuards(JwtAuthGuard)
@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Get('/')
  async getAll(): Promise<Course[]> {
    return this.courseService.getAll();
  }
  @Get('/getCourseById/:id')
  async getById(@Param('id') id: string): Promise<Course> {
    return this.courseService.getById(id);
  }
  @Get('/filterByTags')
  async filterByTags(@Query('tags') tags: string[]): Promise<Course[]> {
    return this.courseService.filterByTags(tags);
  }
}
