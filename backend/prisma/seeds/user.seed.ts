import { PrismaClient } from '@prisma/client';

export async function insertUser(prisma: PrismaClient) {
  await prisma.user.createMany({
    data: [
      {
        email: 'charvit@incubyte.co',
        password:
          '$2b$10$I0vM.YKpDT87ekNAmw8KSe3zdVkQlkpzUZo44.rZ1Od0SeWiqlCJ.',
        profilePhoto: 'https://profilephoto.com',
      },
      {
        email: 'shreyas@incubyte.co',
        password:
          '$2b$10$K.3VzQM7VVGY6pywSVKywOozqlMfwmMADiF5dXBWWj8Fn.qxG9qQW',
        profilePhoto: 'https://profilephoto.com',
      },
      {
        email: 'aman.r@incubyte.co',
        password:
          '$2b$10$gDB3d1r2efve2.aJpXkUH.gKVAXn7w6qW8vMZHa3yoU7cJz2E3aYG',
        profilePhoto: 'https://profilephoto.com',
      },
      {
        email: 'aayush@incubyte.co',
        password:
          '$2b$10$C284RkgSGshCoy0ajGBs1uVBPBiWptx/71WohRwL1YLFTnLZ5ACaS',
        profilePhoto: 'https://profilephoto.com',
      },
    ],
  });
}
