import { PrismaClient } from '@prisma/client';

export async function insertUserCourses(prisma: PrismaClient) {
  await prisma.userCourse.createMany({
    data: [
      {
        userId: '0cecbf92-d381-40b7-b8f8-49ccae3f8263',
        courseId: '57baa1dd-5bed-4ef6-af67-e588962e3a55',
      },
      {
        userId: '0cecbf92-d381-40b7-b8f8-49ccae3f8263',
        courseId: '7be805c9-906e-485f-86a5-0fc11cfe0e2d',
      },
      {
        userId: '0cecbf92-d381-40b7-b8f8-49ccae3f8263',
        courseId: '1d47941f-d10f-411d-821c-32c3f27ec060',
      },

      {
        userId: 'fda692a8-7e23-45bf-ba77-966d2d5356ed',
        courseId: '4c071856-b2a3-4879-bbc1-5e15212ac10b',
      },
      {
        userId: 'fda692a8-7e23-45bf-ba77-966d2d5356ed',
        courseId: '14463832-3393-4515-ab56-0343efdbbf97',
      },
      {
        userId: 'fda692a8-7e23-45bf-ba77-966d2d5356ed',
        courseId: '1d47941f-d10f-411d-821c-32c3f27ec060',
      },

      {
        userId: 'df269158-3560-4b78-8037-7a15e971e105',
        courseId: '57baa1dd-5bed-4ef6-af67-e588962e3a55',
      },
      {
        userId: 'df269158-3560-4b78-8037-7a15e971e105',
        courseId: '67778aa0-945d-4864-873d-f29906cb6c4e',
      },
      {
        userId: 'df269158-3560-4b78-8037-7a15e971e105',
        courseId: '7b9b4e49-f56d-4572-aa12-ef998ed228d9',
      },

      {
        userId: 'db5aaeb0-3e7f-49c2-b1b5-ba67915cee9a',
        courseId: '7b9b4e49-f56d-4572-aa12-ef998ed228d9',
      },
      {
        userId: 'db5aaeb0-3e7f-49c2-b1b5-ba67915cee9a',
        courseId: '812dbfd0-2aeb-4b87-9b89-d2c86d70c224',
      },
      {
        userId: 'db5aaeb0-3e7f-49c2-b1b5-ba67915cee9a',
        courseId: '67778aa0-945d-4864-873d-f29906cb6c4e',
      },
    ],
  });
}
