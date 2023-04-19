import { PrismaClient } from '@prisma/client';
import { insertUserCourses } from './userCourse.seed';

async function main() {
  const prismaClient = new PrismaClient();
  try {
    await prismaClient.$connect();
    await insertUserCourses(prismaClient);
  } catch (e) {
    console.log(e);
  }
  await prismaClient.$disconnect();
}

main();
