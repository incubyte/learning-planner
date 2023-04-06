import { PrismaClient } from '@prisma/client';
import { insertUser } from './user.seed';
import { insertCourse } from './course.seed';

async function main() {
  const prismaClient = new PrismaClient();
  try {
    await prismaClient.$connect();
    await insertUser(prismaClient);
    await insertCourse(prismaClient);
  } catch (e) {
    console.log(e);
  }
  await prismaClient.$disconnect();
}

main();
