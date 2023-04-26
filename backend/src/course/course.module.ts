import { Module } from '@nestjs/common';
import { CourseController } from '@Course/course.controller';
import { CourseService } from '@Course/course.service';

@Module({
  controllers: [CourseController],
  providers: [CourseService],
})
export class CourseModule {}
