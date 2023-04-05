import { PrismaClient } from '@prisma/client';

export async function insertCourse(prisma: PrismaClient) {
  await prisma.course.createMany({
    data: [],
  });
}
