import { PrismaClient } from '@prisma/client';
import { insertCourse } from './course.seed';
import { insertTags } from './tag.seed';
import { insertUser } from './user.seed';

async function main() {
  const prismaClient = new PrismaClient();
  try {
    await prismaClient.$connect();
    await insertUser(prismaClient);
    await insertCourse(prismaClient);
    await insertTags(prismaClient);
  } catch (e) {
    console.log(e);
  }
  await prismaClient.$disconnect();
}

main();
