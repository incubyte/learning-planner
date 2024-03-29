import { Role } from '@/auth/role.enum';
import { RolesGuard } from '@/auth/role.guard';
import { Roles } from '@/decorator/role.decorator';
import { JwtAuthGuard } from '@Auth/jwt-auth-guard/jwt-auth.guard';
import { CourseService } from '@Course/course.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { Course, Tag } from '@prisma/client';
import { CourseDto } from './dto/course.dto';
import { updateCourseDto } from './dto/updateCourse.dto';

@UseGuards(JwtAuthGuard, RolesGuard)
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

  @Get('/getTagsByCourseId/:id')
  async getTagsByCourseId(@Param('id') id: string): Promise<Tag[]> {
    return await this.courseService.getTagsByCourseId(id);
  }
  @Get('/filterByTags')
  async filterByTags(@Query('tags') tags: string[]): Promise<Course[]> {
    return await this.courseService.filterByTags(tags);
  }

  @Get('popular/filterByTags')
  async filterPopularCourseByTags(
    @Query('tags') tags: string[],
  ): Promise<Course[]> {
    return await this.courseService.filterPopularCourseByTags(tags);
  }

  @Roles(Role.Admin)
  @Post('/create')
  async createCourse(@Body() course: CourseDto): Promise<Course> {
    return await this.courseService.createCourse(course);
  }

  @Roles(Role.Admin)
  @Patch('/updateCourseById/:id')
  async updateCoures(
    @Param('id') id: string,
    @Body() updateCourse: updateCourseDto,
  ): Promise<Course> {
    return await this.courseService.updateCourse(id, updateCourse);
  }

  @Roles(Role.Admin)
  @Delete('/delete/:id')
  async deleteCourse(@Param('id') id: string): Promise<string> {
    return await this.courseService.deleteCourse(id);
  }
}
