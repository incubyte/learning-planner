import { User } from '@prisma/client';

export class LeaderboardDto {
  user: User;
  CompletedCourseCount: number;
}
