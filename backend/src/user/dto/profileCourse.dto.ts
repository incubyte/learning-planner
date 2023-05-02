import { Course } from '@prisma/client';

export class ProfileCourseDto {
  courses: Course[];
  count: number;
}
