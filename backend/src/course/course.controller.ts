import { Controller, Get } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseDto } from './dto/course.dto';

@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Get('/getAllCourse')
  async getAll(): Promise<CourseDto[]> {
    return this.courseService.getAll();
  }
}
