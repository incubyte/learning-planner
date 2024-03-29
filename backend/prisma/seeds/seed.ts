import { PrismaClient } from '@prisma/client';
import { insertTags } from './tag.seed';

async function main() {
  const prismaClient = new PrismaClient();
  try {
    await prismaClient.$connect();
    await insertTags(prismaClient);
  } catch (e) {
    console.log(e);
  }
  await prismaClient.$disconnect();
}

main();
