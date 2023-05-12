import { PrismaClient } from '@prisma/client';

export async function insertCourse(prisma: PrismaClient) {
  await prisma.course.createMany({
    data: [
      {
        name: 'Day 1 clean code kata',
        resourseUrls: [
          'https://web.microsoftstream.com/embed/video/21407c23-bd35-471f-ba4a-548ae215539d?autoplay=false&showinfo=true',
        ],
        testUrls: [''],
        imageUrl: 'https://docs.nestjs.com/assets/logo-small.svg',
        credit: 10,
        tags: [1, 2],
        description: 'description',
      },
      {
        name: 'Day 2 clean code and refactoring',
        resourseUrls: [
          'https://web.microsoftstream.com/embed/video/387a80e2-d57b-4111-9185-c0812cc6c574?autoplay=false&showinfo=true',
        ],
        testUrls: [''],
        imageUrl: 'https://docs.nestjs.com/assets/logo-small.svg',
        credit: 10,
        tags: [1, 2, 4],
        description: 'description',
      },
      {
        name: 'Training - coding practice',
        resourseUrls: [
          'https://web.microsoftstream.com/embed/video/6452defd-4cbf-43b2-b447-5a07303815e1?autoplay=false&showinfo=true',
        ],
        testUrls: [''],
        imageUrl: 'https://docs.nestjs.com/assets/logo-small.svg',
        credit: 10,
        tags: [5, 2],
        description: 'description',
      },
      {
        name: 'Victor - DDD@incubyte - Day2 Extra',
        resourseUrls: [
          'https://web.microsoftstream.com/embed/video/2d1bce3c-fcb7-4b95-a10c-6543b186fb15?autoplay=false&showinfo=true',
        ],
        testUrls: [''],
        imageUrl: 'https://docs.nestjs.com/assets/logo-small.svg',
        credit: 10,
        tags: [3],
        description: 'description',
      },
      {
        name: 'Victor - DDD@incubyte - Day3',
        resourseUrls: [
          'https://web.microsoftstream.com/embed/video/de2ac7b9-40b5-4e4b-b949-08eda7ad5b40?autoplay=false&showinfo=true',
        ],
        testUrls: [''],
        imageUrl: 'https://docs.nestjs.com/assets/logo-small.svg',
        credit: 10,
        tags: [3],
        description: 'description',
      },
      {
        name: 'Day 4 code design and Insights',
        resourseUrls: [
          'https://web.microsoftstream.com/embed/video/459b7518-45bc-46b6-b9d5-0954f954aa54?autoplay=false&showinfo=true',
        ],
        testUrls: [''],
        imageUrl: 'https://docs.nestjs.com/assets/logo-small.svg',
        credit: 10,
        tags: [7, 6],
        description: 'description',
      },
      {
        name: 'Day 3 clean code and refactoring',
        resourseUrls: [
          'https://web.microsoftstream.com/embed/video/39beb011-a735-4e48-9642-00b05d644fe3?autoplay=false&showinfo=true',
        ],
        testUrls: [''],
        imageUrl: 'https://docs.nestjs.com/assets/logo-small.svg',
        credit: 10,
        tags: [4],
        description: 'description',
      },
      {
        name: 'Victor - DDD@incubyte - Day2',
        resourseUrls: [
          'https://web.microsoftstream.com/embed/video/b6a7e01c-6d06-4b70-8f39-adbc6eaabb77?autoplay=false&showinfo=true',
        ],
        testUrls: [''],
        imageUrl: 'https://docs.nestjs.com/assets/logo-small.svg',
        credit: 10,
        tags: [3],
        description: 'description',
      },
      {
        name: 'Victor - DDD@incubyte - Day1',
        resourseUrls: [
          'https://web.microsoftstream.com/embed/video/7818e2ba-4a60-4d01-9eac-a141bdcd55e8?autoplay=false&showinfo=true',
        ],
        testUrls: [''],
        imageUrl: 'https://docs.nestjs.com/assets/logo-small.svg',
        credit: 10,
        tags: [3],
        description: 'description',
      },
    ],
  });
}
