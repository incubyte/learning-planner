import { PrismaClient } from '@prisma/client';

export async function insertUserCourses(prisma: PrismaClient) {
  await prisma.userCourse.createMany({
    data: [
      {
        userId: '2fbc0f79-a1ea-4d5e-9c02-9bfb4dac50c3',
        courseId: '57baa1dd-5bed-4ef6-af67-e588962e3a55',
        isCompleted: true,
      },
      {
        userId: '2fbc0f79-a1ea-4d5e-9c02-9bfb4dac50c3',
        courseId: '7be805c9-906e-485f-86a5-0fc11cfe0e2d',
        isCompleted: false,
      },
      {
        userId: '2fbc0f79-a1ea-4d5e-9c02-9bfb4dac50c3',
        courseId: '1d47941f-d10f-411d-821c-32c3f27ec060',
        isCompleted: false,
      },
      {
        userId: '2fbc0f79-a1ea-4d5e-9c02-9bfb4dac50c3',
        courseId: '812dbfd0-2aeb-4b87-9b89-d2c86d70c224',
        isCompleted: true,
      },

      {
        userId: '36ebe3de-10a6-4aa2-81b1-8f27468d0f10',
        courseId: '4c071856-b2a3-4879-bbc1-5e15212ac10b',
        isCompleted: true,
      },
      {
        userId: '36ebe3de-10a6-4aa2-81b1-8f27468d0f10',
        courseId: '14463832-3393-4515-ab56-0343efdbbf97',
        isCompleted: true,
      },
      {
        userId: '36ebe3de-10a6-4aa2-81b1-8f27468d0f10',
        courseId: '1d47941f-d10f-411d-821c-32c3f27ec060',
        isCompleted: true,
      },
      {
        userId: '36ebe3de-10a6-4aa2-81b1-8f27468d0f10',
        courseId: '57baa1dd-5bed-4ef6-af67-e588962e3a55',
        isCompleted: true,
      },

      {
        userId: 'b3a6a0ae-9d12-48e3-b3bc-c371c5823da6',
        courseId: '57baa1dd-5bed-4ef6-af67-e588962e3a55',
        isCompleted: false,
      },
      {
        userId: 'b3a6a0ae-9d12-48e3-b3bc-c371c5823da6',
        courseId: '67778aa0-945d-4864-873d-f29906cb6c4e',
        isCompleted: false,
      },
      {
        userId: 'b3a6a0ae-9d12-48e3-b3bc-c371c5823da6',
        courseId: '7b9b4e49-f56d-4572-aa12-ef998ed228d9',
        isCompleted: false,
      },
      {
        userId: 'b3a6a0ae-9d12-48e3-b3bc-c371c5823da6',
        courseId: '1d47941f-d10f-411d-821c-32c3f27ec060',
        isCompleted: true,
      },

      {
        userId: 'ba50fb85-639c-4ab3-ad28-af0aa1c39d4d',
        courseId: '7b9b4e49-f56d-4572-aa12-ef998ed228d9',
        isCompleted: false,
      },
      {
        userId: 'ba50fb85-639c-4ab3-ad28-af0aa1c39d4d',
        courseId: '812dbfd0-2aeb-4b87-9b89-d2c86d70c224',
        isCompleted: true,
      },
      {
        userId: 'ba50fb85-639c-4ab3-ad28-af0aa1c39d4d',
        courseId: '67778aa0-945d-4864-873d-f29906cb6c4e',
        isCompleted: false,
      },
      {
        userId: 'ba50fb85-639c-4ab3-ad28-af0aa1c39d4d',
        courseId: '1d47941f-d10f-411d-821c-32c3f27ec060',
        isCompleted: true,
      },

      {
        userId: 'ecb768e8-6a76-4daa-bce5-6abb123eccbf',
        courseId: '57baa1dd-5bed-4ef6-af67-e588962e3a55',
        isCompleted: true,
      },
      {
        userId: 'ecb768e8-6a76-4daa-bce5-6abb123eccbf',
        courseId: '7be805c9-906e-485f-86a5-0fc11cfe0e2d',
        isCompleted: false,
      },
      {
        userId: 'ecb768e8-6a76-4daa-bce5-6abb123eccbf',
        courseId: '1d47941f-d10f-411d-821c-32c3f27ec060',
        isCompleted: false,
      },

      {
        userId: 'ee718e97-27b2-479e-8255-47f53f9330eb',
        courseId: '4c071856-b2a3-4879-bbc1-5e15212ac10b',
        isCompleted: false,
      },
      {
        userId: 'ee718e97-27b2-479e-8255-47f53f9330eb',
        courseId: '14463832-3393-4515-ab56-0343efdbbf97',
        isCompleted: true,
      },
      {
        userId: 'ee718e97-27b2-479e-8255-47f53f9330eb',
        courseId: '1d47941f-d10f-411d-821c-32c3f27ec060',
        isCompleted: true,
      },

      {
        userId: 'fae6f3cc-f2d2-4abc-a5d4-18db41aed554',
        courseId: '57baa1dd-5bed-4ef6-af67-e588962e3a55',
        isCompleted: false,
      },
      {
        userId: 'fae6f3cc-f2d2-4abc-a5d4-18db41aed554',
        courseId: '67778aa0-945d-4864-873d-f29906cb6c4e',
        isCompleted: false,
      },
      {
        userId: 'fae6f3cc-f2d2-4abc-a5d4-18db41aed554',
        courseId: '7b9b4e49-f56d-4572-aa12-ef998ed228d9',
        isCompleted: false,
      },

      {
        userId: 'fd9f12a7-e364-4372-b357-5bacb2d980cd',
        courseId: '7b9b4e49-f56d-4572-aa12-ef998ed228d9',
        isCompleted: false,
      },
      {
        userId: 'fd9f12a7-e364-4372-b357-5bacb2d980cd',
        courseId: '812dbfd0-2aeb-4b87-9b89-d2c86d70c224',
        isCompleted: true,
      },
      {
        userId: 'fd9f12a7-e364-4372-b357-5bacb2d980cd',
        courseId: '67778aa0-945d-4864-873d-f29906cb6c4e',
        isCompleted: false,
      },
    ],
  });
}
