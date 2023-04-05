import { insertUser } from '@PrismaORM/seeds/user.seed';
import { PrismaClient } from '@prisma/client';
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
