import { IsNotEmpty } from 'class-validator';

export class CourseDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  resourseUrls: string[];

  @IsNotEmpty()
  testUrls: string[];

  @IsNotEmpty()
  imageUrl: string;

  @IsNotEmpty()
  credit: number;

  description: string;
}
