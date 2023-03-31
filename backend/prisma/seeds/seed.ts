import { PrismaClient } from '@prisma/client';
import { insertUser } from '@PrismaORM/seeds/user.seed';

async function main() {
  const prismaClient = new PrismaClient();
  try {
    await prismaClient.$connect();
    await insertUser(prismaClient);
  } catch (e) {
    console.log(e);
  }
  await prismaClient.$disconnect();
}

main();
