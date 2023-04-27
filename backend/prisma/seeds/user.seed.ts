import { PrismaClient } from '@prisma/client';

export async function insertUser(prisma: PrismaClient) {
  await prisma.user.createMany({
    data: [
      {
        email: 'charvit@incubyte.co',
        password:
          '$2b$10$I0vM.YKpDT87ekNAmw8KSe3zdVkQlkpzUZo44.rZ1Od0SeWiqlCJ.',
        profilePhoto: 'https://profilephoto.com',
        eId: 'E0088',
        role: 'SC',
        clientTeam: 'Learning Planner',
      },
      {
        email: 'shreyas@incubyte.co',
        password:
          '$2b$10$K.3VzQM7VVGY6pywSVKywOozqlMfwmMADiF5dXBWWj8Fn.qxG9qQW',
        profilePhoto: 'https://profilephoto.com',
        eId: 'E0097',
        role: 'SC',
        clientTeam: 'Learning Planner',
      },
      {
        email: 'aman.r@incubyte.co',
        password:
          '$2b$10$gDB3d1r2efve2.aJpXkUH.gKVAXn7w6qW8vMZHa3yoU7cJz2E3aYG',
        profilePhoto: 'https://profilephoto.com',
        eId: 'E0098',
        role: 'SC',
        clientTeam: 'Learning Planner',
      },
      {
        email: 'aayush@incubyte.co',
        password:
          '$2b$10$C284RkgSGshCoy0ajGBs1uVBPBiWptx/71WohRwL1YLFTnLZ5ACaS',
        profilePhoto: 'https://profilephoto.com',
        eId: 'E0091',
        role: 'SC',
        clientTeam: 'Learning Planner',
      },
      {
        email: 'jaypal@incubyte.co',
        password:
          '$2b$10$haH0h/Y7vvHGe4z0z2zJK.4gQvWHrYSTqGMGVdkquPENXfUpWSG7K',
        profilePhoto: 'https://profilephoto.com',
        eId: 'E0050',
        role: 'SC',
        clientTeam: 'WIP/retreat',
      },
      {
        email: 'dhaval@incubyte.co',
        password:
          '$2b$10$haH0h/Y7vvHGe4z0z2zJK.4gQvWHrYSTqGMGVdkquPENXfUpWSG7K',
        profilePhoto: 'https://profilephoto.com',
        eId: 'E0051',
        role: 'SC',
        clientTeam: 'Employee Feedback',
      },
      {
        email: 'brijesh@incubyte.co',
        password:
          '$2b$10$haH0h/Y7vvHGe4z0z2zJK.4gQvWHrYSTqGMGVdkquPENXfUpWSG7K',
        profilePhoto: 'https://profilephoto.com',
        eId: 'E0052',
        role: 'SC',
        clientTeam: 'WIP/retreat',
      },
      {
        email: 'mahesh@incubyte.co',
        password:
          '$2b$10$haH0h/Y7vvHGe4z0z2zJK.4gQvWHrYSTqGMGVdkquPENXfUpWSG7K',
        profilePhoto: 'https://profilephoto.com',
        eId: 'E0053',
        role: 'SC',
        clientTeam: 'Employee Feedback',
      },
    ],
  });
}
