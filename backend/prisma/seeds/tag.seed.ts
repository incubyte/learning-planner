import { PrismaClient } from '@prisma/client';

export async function insertTags(prisma: PrismaClient) {
  await prisma.tag.createMany({
    data: [
      {
        name: 'clean-code',
      },
      {
        name: 'best-practice',
      },
      {
        name: 'victor',
      },
      {
        name: 'refactoring',
      },
      {
        name: 'coding',
      },
      {
        name: 'insights',
      },
      {
        name: 'code-design',
      },
    ],
  });
}
