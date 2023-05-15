import { PrismaClient } from '@prisma/client';

export async function insertUserCourses(prisma: PrismaClient) {
  await prisma.userCourse.createMany({
    data: [
      {
        userId: '2fbc0f79-a1ea-4d5e-9c02-9bfb4dac50c3',
        courseId: '293b19f2-535e-46f7-8862-166cfe2422a1',
        isCompleted: true,
      },
      {
        userId: '2fbc0f79-a1ea-4d5e-9c02-9bfb4dac50c3',
        courseId: '4a3074d8-549f-48b1-9b7b-64a0db619eec',
        isCompleted: false,
      },
      {
        userId: '2fbc0f79-a1ea-4d5e-9c02-9bfb4dac50c3',
        courseId: '7cdbab7f-17ce-43f9-ad4b-3984dff7993d',
        isCompleted: false,
      },
      {
        userId: '2fbc0f79-a1ea-4d5e-9c02-9bfb4dac50c3',
        courseId: '8dcc541a-ef60-489c-b832-8b286d9e7410',
        isCompleted: true,
      },

      {
        userId: '36ebe3de-10a6-4aa2-81b1-8f27468d0f10',
        courseId: '7cdbab7f-17ce-43f9-ad4b-3984dff7993d',
        isCompleted: true,
      },
      {
        userId: '36ebe3de-10a6-4aa2-81b1-8f27468d0f10',
        courseId: '8dcc541a-ef60-489c-b832-8b286d9e7410',
        isCompleted: true,
      },
      {
        userId: '36ebe3de-10a6-4aa2-81b1-8f27468d0f10',
        courseId: '9c1d4c5e-6e6d-4cf3-a828-fc238baf1cf0',
        isCompleted: true,
      },
      {
        userId: '36ebe3de-10a6-4aa2-81b1-8f27468d0f10',
        courseId: 'ae2e06ab-46e3-4ba5-ab64-124151e833d7',
        isCompleted: true,
      },

      {
        userId: 'b3a6a0ae-9d12-48e3-b3bc-c371c5823da6',
        courseId: '9c1d4c5e-6e6d-4cf3-a828-fc238baf1cf0',
        isCompleted: false,
      },
      {
        userId: 'b3a6a0ae-9d12-48e3-b3bc-c371c5823da6',
        courseId: 'ae2e06ab-46e3-4ba5-ab64-124151e833d7',
        isCompleted: false,
      },
      {
        userId: 'b3a6a0ae-9d12-48e3-b3bc-c371c5823da6',
        courseId: 'bdbdf8d4-2928-44ab-a5a3-9fbd5a873212',
        isCompleted: false,
      },
      {
        userId: 'b3a6a0ae-9d12-48e3-b3bc-c371c5823da6',
        courseId: 'c96df454-0625-4abb-a85e-eeb05fc5213e',
        isCompleted: true,
      },

      {
        userId: 'ba50fb85-639c-4ab3-ad28-af0aa1c39d4d',
        courseId: 'c96df454-0625-4abb-a85e-eeb05fc5213e',
        isCompleted: false,
      },
      {
        userId: 'ba50fb85-639c-4ab3-ad28-af0aa1c39d4d',
        courseId: 'e876fe8a-ad7f-4e33-ba2e-f9ebe008e4ea',
        isCompleted: true,
      },
      {
        userId: 'ba50fb85-639c-4ab3-ad28-af0aa1c39d4d',
        courseId: '293b19f2-535e-46f7-8862-166cfe2422a1',
        isCompleted: false,
      },
      {
        userId: 'ba50fb85-639c-4ab3-ad28-af0aa1c39d4d',
        courseId: '4a3074d8-549f-48b1-9b7b-64a0db619eec',
        isCompleted: true,
      },

      {
        userId: 'ecb768e8-6a76-4daa-bce5-6abb123eccbf',
        courseId: '4a3074d8-549f-48b1-9b7b-64a0db619eec',
        isCompleted: true,
      },
      {
        userId: 'ecb768e8-6a76-4daa-bce5-6abb123eccbf',
        courseId: '8dcc541a-ef60-489c-b832-8b286d9e7410',
        isCompleted: false,
      },
      {
        userId: 'ecb768e8-6a76-4daa-bce5-6abb123eccbf',
        courseId: '7cdbab7f-17ce-43f9-ad4b-3984dff7993d',
        isCompleted: false,
      },

      {
        userId: 'ee718e97-27b2-479e-8255-47f53f9330eb',
        courseId: '8dcc541a-ef60-489c-b832-8b286d9e7410',
        isCompleted: false,
      },
      {
        userId: 'ee718e97-27b2-479e-8255-47f53f9330eb',
        courseId: '9c1d4c5e-6e6d-4cf3-a828-fc238baf1cf0',
        isCompleted: true,
      },
      {
        userId: 'ee718e97-27b2-479e-8255-47f53f9330eb',
        courseId: 'ae2e06ab-46e3-4ba5-ab64-124151e833d7',
        isCompleted: true,
      },

      {
        userId: 'fae6f3cc-f2d2-4abc-a5d4-18db41aed554',
        courseId: 'ae2e06ab-46e3-4ba5-ab64-124151e833d7',
        isCompleted: false,
      },
      {
        userId: 'fae6f3cc-f2d2-4abc-a5d4-18db41aed554',
        courseId: 'bdbdf8d4-2928-44ab-a5a3-9fbd5a873212',
        isCompleted: false,
      },
      {
        userId: 'fae6f3cc-f2d2-4abc-a5d4-18db41aed554',
        courseId: 'c96df454-0625-4abb-a85e-eeb05fc5213e',
        isCompleted: false,
      },

      {
        userId: 'fd9f12a7-e364-4372-b357-5bacb2d980cd',
        courseId: 'c96df454-0625-4abb-a85e-eeb05fc5213e',
        isCompleted: false,
      },
      {
        userId: 'fd9f12a7-e364-4372-b357-5bacb2d980cd',
        courseId: 'e876fe8a-ad7f-4e33-ba2e-f9ebe008e4ea',
        isCompleted: true,
      },
      {
        userId: 'fd9f12a7-e364-4372-b357-5bacb2d980cd',
        courseId: '8dcc541a-ef60-489c-b832-8b286d9e7410',
        isCompleted: false,
      },
    ],
  });
}
