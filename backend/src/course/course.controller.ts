import { JwtAuthGuard } from '@/auth/jwt-auth-guard/jwt-auth.guard';
import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseDto } from './dto/course.dto';

@UseGuards(JwtAuthGuard)
@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Get('/')
  async getAll(): Promise<CourseDto[]> {
    return this.courseService.getAll();
  }
  @Get('/:id')
  async getById(@Param('id') id: string): Promise<CourseDto> {
    return this.courseService.getById(id);
  }
  @Get('/filterByTags/')
  async filterByTags(@Query('tags') tags: string[]): Promise<CourseDto[]> {
    return this.courseService.filterByTags(tags);
  }
}
