import { JwtAuthGuard } from '@/auth/jwt-auth-guard/jwt-auth.guard';
import { Controller, Get, UseGuards } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseDto } from './dto/course.dto';

@UseGuards(JwtAuthGuard)
@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Get('/getAllCourse')
  async getAll(): Promise<CourseDto[]> {
    return this.courseService.getAll();
  }
}
