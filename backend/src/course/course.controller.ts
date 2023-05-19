import { JwtAuthGuard } from '@Auth/jwt-auth-guard/jwt-auth.guard';
import { CourseService } from '@Course/course.service';
import { Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { Course } from '@prisma/client';
import { CourseDto } from './dto/course.dto';
import { Roles } from '@/decorator/role.decorator';
import { Role } from '@/auth/role.enum';

@UseGuards(JwtAuthGuard)
@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Get('/')
  async getAll(): Promise<Course[]> {
    return await this.courseService.getAll();
  }

  @Get('/popular')
  async getPopularCourse(): Promise<Course[]> {
    return this.courseService.getPopularCourse();
  }
  @Get('/getCourseById/:id')
  async getById(@Param('id') id: string): Promise<Course> {
    return await this.courseService.getById(id);
  }
  @Get('/filterByTags')
  async filterByTags(@Query('tags') tags: string[]): Promise<Course[]> {
    return await this.courseService.filterByTags(tags);
  }

  @Roles(Role.Admin)
  @Post('/create')
  createCourse(course: CourseDto): Promise<Course> {
    return this.courseService.createCourse(course);
  }
}
