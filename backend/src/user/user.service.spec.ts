import { Role } from '@/auth/role.enum';
import { UserDto } from '@Auth/dto/user.dto';
import { PrismaService } from '@Prisma/prisma.service';
import { UpdateUserDto } from '@User/dto/updateUser.dto';
import { UserService } from '@User/user.service';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Course, UserCourse } from '@prisma/client';
import { AddUserDto } from './dto/addUser.dto';
import { ProfileCourseDto } from './dto/profileCourse.dto';

describe('UserService', () => {
  let service: UserService;
  let prismaService: PrismaService;
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: PrismaService,
          useFactory() {
            return {
              user: {
                findFirst: jest.fn(),
                update: jest.fn(),
                findMany: jest.fn(),
                createMany: jest.fn(),
                delete: jest.fn(),
              },
              userCourse: {
                findMany: jest.fn(),
                groupBy: jest.fn(),
                findFirst: jest.fn(),
                update: jest.fn(),
                create: jest.fn(),
              },
              course: {
                findFirst: jest.fn(),
                findMany: jest.fn(),
              },
            };
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('User Service', () => {
    const userDTO: UserDto = {
      email: 'john@incubyte.co',
      password: '1234',
    };
    it('should return user of specified id', async () => {
      const mockResponse = {
        email: userDTO.email,
        password: userDTO.password,
        id: '1',
        createdAt: Date.prototype,
        profilePhoto: 'https://profilephoto.com',
        updatedAt: Date.prototype,
        eId: 'E0001',
        role: 'BQA',
        clientTeam: 'abc',
        roles: Role.Employee,
      };

      jest
        .spyOn(prismaService.user, 'findFirst')
        .mockResolvedValue(mockResponse);
      const result = await service.getUserById('1');
      expect(prismaService.user.findFirst).toBeCalledTimes(1);
      expect(result).toMatchObject(mockResponse);
    });

    it('should return the course of the specific user', async () => {
      const prismaUserId = '0cecbf92-d381-40b7-b8f8-49ccae3f8263';
      const prismaCourse1Id = '57baa1dd-5bed-4ef6-af67-e588962e3a55';
      const prismaCourse2Id = '7be805c9-906e-485f-86a5-0fc11cfe0e2d';
      const prismaCourse3Id = '1d47941f-d10f-411d-821c-32c3f27ec060';
      const prismaCourse1 = {
        id: '57baa1dd-5bed-4ef6-af67-e588962e3a55',
        name: 'Victor - DDD@incubyte - Day1',
        resourseUrls: [
          'https://web.microsoftstream.com/video/7818e2ba-4a60-4d01-9eac-a141bdcd55e8',
        ],
        testUrls: [''],
        imageUrl: 'https://docs.nestjs.com/assets/logo-small.svg',
        credit: 10,
        tags: [3],
        description: 'description',
        createdAt: Date.prototype,
        updatedAt: Date.prototype,
      };
      const prismaCourse2 = {
        id: '7be805c9-906e-485f-86a5-0fc11cfe0e2d',
        name: 'Day 1 clean code kata',
        resourseUrls: [
          'https://web.microsoftstream.com/video/21407c23-bd35-471f-ba4a-548ae215539d',
        ],
        testUrls: [''],
        imageUrl: 'https://docs.nestjs.com/assets/logo-small.svg',
        credit: 10,
        tags: [1, 2],
        description: 'description',
        createdAt: Date.prototype,
        updatedAt: Date.prototype,
      };
      const prismaCourse3 = {
        id: '1d47941f-d10f-411d-821c-32c3f27ec060',
        name: 'Day 4 code design and Insights',
        resourseUrls: [
          'https://web.microsoftstream.com/video/459b7518-45bc-46b6-b9d5-0954f954aa54',
        ],
        testUrls: [''],
        imageUrl: 'https://docs.nestjs.com/assets/logo-small.svg',
        credit: 10,
        tags: [7, 6],
        description: 'description',
        createdAt: Date.prototype,
        updatedAt: Date.prototype,
      };
      const mockUserCourseResponse = [
        {
          id: 1,
          userId: '0cecbf92-d381-40b7-b8f8-49ccae3f8263',
          courseId: '57baa1dd-5bed-4ef6-af67-e588962e3a55',
          isCompleted: true,
        },
        {
          id: 2,
          userId: '0cecbf92-d381-40b7-b8f8-49ccae3f8263',
          courseId: '7be805c9-906e-485f-86a5-0fc11cfe0e2d',
          isCompleted: true,
        },
        {
          id: 3,
          userId: '0cecbf92-d381-40b7-b8f8-49ccae3f8263',
          courseId: '1d47941f-d10f-411d-821c-32c3f27ec060',
          isCompleted: true,
        },
      ];
      const mockCourse = [prismaCourse1, prismaCourse2, prismaCourse3];
      const courseIds = [prismaCourse1Id, prismaCourse2Id, prismaCourse3Id];
      const mockCourseResponse: ProfileCourseDto = {
        courses: mockCourse,
        count: 3,
      };

      jest
        .spyOn(prismaService.userCourse, 'findMany')
        .mockResolvedValue(mockUserCourseResponse);

      jest
        .spyOn(prismaService.course, 'findMany')
        .mockResolvedValueOnce(mockCourse);

      const courses = await service.getCourseByUserId(prismaUserId, '');
      expect(prismaService.userCourse.findMany).toHaveBeenCalledWith({
        where: { userId: prismaUserId },
      });
      expect(prismaService.course.findMany).toHaveBeenNthCalledWith(1, {
        where: {
          id: {
            in: courseIds,
          },
        },
      });
      expect(courses).toEqual(mockCourseResponse);
    });

    it('should return the completed course of the specific user', async () => {
      const prismaUserId = '0cecbf92-d381-40b7-b8f8-49ccae3f8263';
      const prismaCourse1Id = '57baa1dd-5bed-4ef6-af67-e588962e3a55';
      const prismaCourse2Id = '7be805c9-906e-485f-86a5-0fc11cfe0e2d';

      const prismaCourse1 = {
        id: '57baa1dd-5bed-4ef6-af67-e588962e3a55',
        name: 'Victor - DDD@incubyte - Day1',
        resourseUrls: [
          'https://web.microsoftstream.com/video/7818e2ba-4a60-4d01-9eac-a141bdcd55e8',
        ],
        testUrls: [''],
        imageUrl: 'https://docs.nestjs.com/assets/logo-small.svg',
        credit: 10,
        tags: [3],
        description: 'description',
        createdAt: Date.prototype,
        updatedAt: Date.prototype,
      };
      const prismaCourse2 = {
        id: '7be805c9-906e-485f-86a5-0fc11cfe0e2d',
        name: 'Day 1 clean code kata',
        resourseUrls: [
          'https://web.microsoftstream.com/video/21407c23-bd35-471f-ba4a-548ae215539d',
        ],
        testUrls: [''],
        imageUrl: 'https://docs.nestjs.com/assets/logo-small.svg',
        credit: 10,
        tags: [1, 2],
        description: 'description',
        createdAt: Date.prototype,
        updatedAt: Date.prototype,
      };

      const mockUserCourseResponse = [
        {
          id: 1,
          userId: '0cecbf92-d381-40b7-b8f8-49ccae3f8263',
          courseId: '57baa1dd-5bed-4ef6-af67-e588962e3a55',
          isCompleted: true,
        },
        {
          id: 2,
          userId: '0cecbf92-d381-40b7-b8f8-49ccae3f8263',
          courseId: '7be805c9-906e-485f-86a5-0fc11cfe0e2d',
          isCompleted: true,
        },
      ];
      const mockCourse = [prismaCourse1, prismaCourse2];
      const courseIds = [prismaCourse1Id, prismaCourse2Id];
      const mockCourseResponse: ProfileCourseDto = {
        courses: mockCourse,
        count: 2,
      };

      jest
        .spyOn(prismaService.userCourse, 'findMany')
        .mockResolvedValue(mockUserCourseResponse);

      jest
        .spyOn(prismaService.course, 'findMany')
        .mockResolvedValueOnce(mockCourse);

      const courses = await service.getCourseByUserId(
        prismaUserId,
        'completed',
      );
      expect(prismaService.userCourse.findMany).toHaveBeenCalledWith({
        where: { userId: prismaUserId, isCompleted: true },
      });
      expect(prismaService.course.findMany).toHaveBeenNthCalledWith(1, {
        where: {
          id: {
            in: courseIds,
          },
        },
      });
      expect(courses).toEqual(mockCourseResponse);
    });
    it('should return the updated user', async () => {
      const updateProfileBody: UpdateUserDto = {
        role: 'BQAE',
        clientTeam: 'abcd',
        profilePhoto: 'https://profilephoto.com',
        eId: 'E0010',
        email: 'john@incubyte.co',
        roles: Role.Employee,
      };

      const mockUpdatedUser = {
        email: userDTO.email,
        password: userDTO.password,
        id: '1',
        createdAt: Date.prototype,
        profilePhoto: 'https://profilephoto.com',
        updatedAt: Date.prototype,
        eId: 'E0001',
        role: 'BQAE',
        clientTeam: 'abcd',
        roles: Role.Employee,
      };
      jest
        .spyOn(prismaService.user, 'update')
        .mockResolvedValue(mockUpdatedUser);
      const result = await service.updateProfile(updateProfileBody, '1');
      expect(prismaService.user.update).toBeCalledTimes(1);
      expect(result).toMatchObject(mockUpdatedUser);
    });

    it('should return the top 5 users', async () => {
      const mockResponse = [
        {
          user: {
            id: '36ebe3de-10a6-4aa2-81b1-8f27468d0f10',
            eId: 'E0088',
            role: 'SC',
            clientTeam: 'Learning Planner',
            email: 'charvit@incubyte.co',
            password:
              '$2b$10$I0vM.YKpDT87ekNAmw8KSe3zdVkQlkpzUZo44.rZ1Od0SeWiqlCJ.',
            profilePhoto: 'https://profilephoto.com',
            createdAt: Date.prototype,
            updatedAt: Date.prototype,
            roles: Role.Employee,
          },
          CompletedCourseCount: 4,
        },
        {
          user: {
            id: '2fbc0f79-a1ea-4d5e-9c02-9bfb4dac50c3',
            eId: 'E0097',
            role: 'SC',
            clientTeam: 'Learning Planner',
            email: 'shreyas@incubyte.co',
            password:
              '$2b$10$K.3VzQM7VVGY6pywSVKywOozqlMfwmMADiF5dXBWWj8Fn.qxG9qQW',
            profilePhoto:
              'https://res.cloudinary.com/dxepcudkt/image/upload/v1682573373/cojqoxpcgax1tkq0zi6a.jpg',
            createdAt: Date.prototype,
            updatedAt: Date.prototype,
            roles: Role.Employee,
          },
          CompletedCourseCount: 2,
        },
      ];

      const mockUser1 = {
        id: '2fbc0f79-a1ea-4d5e-9c02-9bfb4dac50c3',
        eId: 'E0097',
        role: 'SC',
        clientTeam: 'Learning Planner',
        email: 'shreyas@incubyte.co',
        password:
          '$2b$10$K.3VzQM7VVGY6pywSVKywOozqlMfwmMADiF5dXBWWj8Fn.qxG9qQW',
        profilePhoto:
          'https://res.cloudinary.com/dxepcudkt/image/upload/v1682573373/cojqoxpcgax1tkq0zi6a.jpg',
        createdAt: Date.prototype,
        updatedAt: Date.prototype,
        roles: Role.Employee,
      };

      const mockUser2 = {
        id: '36ebe3de-10a6-4aa2-81b1-8f27468d0f10',
        eId: 'E0088',
        role: 'SC',
        clientTeam: 'Learning Planner',
        email: 'charvit@incubyte.co',
        password:
          '$2b$10$I0vM.YKpDT87ekNAmw8KSe3zdVkQlkpzUZo44.rZ1Od0SeWiqlCJ.',
        profilePhoto: 'https://profilephoto.com',
        createdAt: Date.prototype,
        updatedAt: Date.prototype,
        roles: Role.Employee,
      };
      const mockUsers = [mockUser2, mockUser1];
      const mockUserCourse1 = {
        _count: {
          courseId: 4,
        },
        userId: '36ebe3de-10a6-4aa2-81b1-8f27468d0f10',
      };
      const mockUserCourse2 = {
        _count: {
          courseId: 2,
        },
        userId: '2fbc0f79-a1ea-4d5e-9c02-9bfb4dac50c3',
      };
      const mockUserCourseResponse: any = [mockUserCourse1, mockUserCourse2];
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      jest
        .spyOn(prismaService.userCourse, 'groupBy')
        .mockResolvedValueOnce(mockUserCourseResponse);

      jest
        .spyOn(prismaService.user, 'findMany')
        .mockResolvedValueOnce(mockUsers);

      const leaderboard = await service.getLeaderboard();

      expect(prismaService.userCourse.groupBy).toBeCalledTimes(1);
      expect(leaderboard).toEqual(mockResponse);
    });

    it('should enroll the course for user', async () => {
      const mockUserCourse: UserCourse = null;
      const mockCourse: Course = {
        name: 'Day 1 clean code kata',
        resourseUrls: [
          'https://web.microsoftstream.com/video/21407c23-bd35-471f-ba4a-548ae215539d',
        ],
        testUrls: [''],
        imageUrl:
          'https://in.images.search.yahoo.com/images/view;_ylt=Awr1SSiRTy1kb4cLLsq9HAx.;_ylu=c2VjA3NyBHNsawNpbWcEb2lkAzQyZTY0MDk5ZDU4ZTA0NjIxZGIyOTFiMzFhNjU3YmIxBGdwb3MDMjAEaXQDYmluZw--?back=https%3A%2F%2Fin.images.search.yahoo.com%2Fsearch%2Fimages%3Fp%3Dclean%2Bcode%26type%3DE211IN826G0%26fr%3Dmcafee%26fr2%3Dpiv-web%26tab%3Dorganic%26ri%3D20&w=1280&h=720&imgurl=i.ytimg.com%2Fvi%2F4LUNr4AeLZM%2Fmaxresdefault.jpg&rurl=http%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3D4LUNr4AeLZM&size=138.8KB&p=clean+code&oid=42e64099d58e04621db291b31a657bb1&fr2=piv-web&fr=mcafee&tt=Clean+Code%21+-+YouTube&b=0&ni=21&no=20&ts=&tab=organic&sigr=BwBZBBbiDgZS&sigb=N4X2keUrYF9q&sigi=E7Tff6GG25xa&sigt=NZfjbeVtrurr&.crumb=AVdd1qPlDGC&fr=mcafee&fr2=piv-web&type=E211IN826G0',
        credit: 10,
        tags: [1],
        description: 'description',
        id: '',
        createdAt: undefined,
        updatedAt: undefined,
      };
      jest
        .spyOn(prismaService.course, 'findFirst')
        .mockResolvedValueOnce(mockCourse);
      jest
        .spyOn(prismaService.userCourse, 'findFirst')
        .mockResolvedValueOnce(mockUserCourse);

      const mockCreateUserCourse: UserCourse = {
        id: 1,
        userId: '1',
        courseId: 'course1',
        isCompleted: false,
      };

      jest
        .spyOn(prismaService.userCourse, 'create')
        .mockResolvedValueOnce(mockCreateUserCourse);
      const result = await service.enrollCourse('1', 'course1');
      expect(result).toEqual(mockCreateUserCourse);
      expect(prismaService.userCourse.findFirst).toHaveBeenCalledWith({
        where: {
          userId: '1',
          courseId: 'course1',
        },
      });
      expect(prismaService.userCourse.create).toHaveBeenCalledWith({
        data: {
          userId: '1',
          courseId: 'course1',
          isCompleted: false,
        },
      });
    });

    it('should throw BadRequestException when user is already enrolled in course', async () => {
      const mockUserCourse: UserCourse = {
        id: 1,
        userId: '1',
        courseId: 'course1',
        isCompleted: false,
      };
      jest
        .spyOn(prismaService.userCourse, 'findFirst')
        .mockResolvedValueOnce(mockUserCourse);
      jest.spyOn(service, 'isUserEnrolledInCourse').mockReturnValue(true);
      await expect(service.enrollCourse('1', 'course1')).rejects.toThrow(
        NotFoundException,
      );
      expect(prismaService.userCourse.create).not.toHaveBeenCalled();
    });

    it('should return true when user is enrolled in course', () => {
      const userCourse: UserCourse = {
        id: 1,
        userId: '1',
        courseId: 'course1',
        isCompleted: false,
      };
      expect(service.isUserEnrolledInCourse(userCourse)).toBe(true);
    });

    it('should return false when user is not enrolled in course', () => {
      const userCourse: UserCourse = null;
      expect(service.isUserEnrolledInCourse(userCourse)).toBe(false);
    });

    it('should complete the course for the user', async () => {
      const mockUserCourse: UserCourse = {
        id: 1,
        userId: '1',
        courseId: 'course1',
        isCompleted: false,
      };
      const updatedMockUser: UserCourse = {
        id: 1,
        userId: '1',
        courseId: 'course1',
        isCompleted: true,
      };
      jest
        .spyOn(prismaService.userCourse, 'findFirst')
        .mockResolvedValueOnce(mockUserCourse);
      jest
        .spyOn(prismaService.userCourse, 'update')
        .mockResolvedValueOnce(updatedMockUser);
      const result = await service.completeCourse('1', 'course1');
      expect(result).toEqual(updatedMockUser);
      expect(prismaService.userCourse.findFirst).toHaveBeenCalledWith({
        where: {
          userId: '1',
          courseId: 'course1',
        },
      });
      expect(prismaService.userCourse.update).toHaveBeenCalledWith({
        where: {
          id: 1,
        },
        data: {
          isCompleted: true,
        },
      });
    });

    it('should throw NotFoundExecption if user is not enrolled for course', async () => {
      const mockUserCourse: UserCourse = null;
      jest
        .spyOn(prismaService.userCourse, 'findFirst')
        .mockResolvedValueOnce(mockUserCourse);
      await expect(service.completeCourse('1', 'course1')).rejects.toThrow(
        NotFoundException,
      );
      expect(prismaService.userCourse.update).not.toHaveBeenCalled();
      expect(prismaService.userCourse.findFirst).toHaveBeenCalledWith({
        where: {
          userId: '1',
          courseId: 'course1',
        },
      });
    });

    it('should throw BadRequestExecption if course is already completed', async () => {
      const mockUserCourse: UserCourse = {
        id: 1,
        userId: '1',
        courseId: 'course1',
        isCompleted: true,
      };
      jest
        .spyOn(prismaService.userCourse, 'findFirst')
        .mockResolvedValueOnce(mockUserCourse);
      await expect(service.completeCourse('1', 'course1')).rejects.toThrow(
        BadRequestException,
      );
      expect(prismaService.userCourse.update).not.toHaveBeenCalled();
      expect(prismaService.userCourse.findFirst).toHaveBeenCalledWith({
        where: {
          userId: '1',
          courseId: 'course1',
        },
      });
    });

    it('should return 0 if the user is not enrolled for course', async () => {
      jest.spyOn(prismaService.userCourse, 'findFirst').mockResolvedValue(null);
      const result = await service.getStatusOfCourse('1', 'course1');
      expect(prismaService.userCourse.findFirst).toBeCalledTimes(1);
      expect(prismaService.userCourse.findFirst).toHaveBeenCalledWith({
        where: {
          userId: '1',
          courseId: 'course1',
        },
      });
      expect(result).toEqual(0);
    });
    it('should return 1 if the user is enrolled for course but not completed the course', async () => {
      const mockUserCourse: UserCourse = {
        id: 1,
        userId: '1',
        courseId: 'course1',
        isCompleted: false,
      };
      jest
        .spyOn(prismaService.userCourse, 'findFirst')
        .mockResolvedValue(mockUserCourse);
      const result = await service.getStatusOfCourse('1', 'course1');
      expect(prismaService.userCourse.findFirst).toBeCalledTimes(1);
      expect(prismaService.userCourse.findFirst).toHaveBeenCalledWith({
        where: {
          userId: '1',
          courseId: 'course1',
        },
      });
      expect(result).toEqual(1);
    });
    it('should return 2 if the user has completed the course', async () => {
      const mockUserCourse: UserCourse = {
        id: 1,
        userId: '1',
        courseId: 'course1',
        isCompleted: true,
      };
      jest
        .spyOn(prismaService.userCourse, 'findFirst')
        .mockResolvedValue(mockUserCourse);
      const result = await service.getStatusOfCourse('1', 'course1');
      expect(prismaService.userCourse.findFirst).toBeCalledTimes(1);
      expect(prismaService.userCourse.findFirst).toHaveBeenCalledWith({
        where: {
          userId: '1',
          courseId: 'course1',
        },
      });
      expect(result).toEqual(2);
    });
    it('should create user', async () => {
      const user: AddUserDto[] = [
        {
          eid: 'E0001',
          role: 'SC',
          email: 'john@incubyte.co',
          clientTeam: 'SH',
          roles: Role.Employee,
        },
      ];

      const mockResponse = {
        count: 1,
      };
      jest
        .spyOn(prismaService.user, 'createMany')
        .mockResolvedValueOnce(mockResponse);
      const result = await service.addUser(user);
      expect(prismaService.user.createMany).toBeCalledTimes(1);

      expect(result).toEqual(1);
    });
    it('should update user', async () => {
      const updateProfileBody: UpdateUserDto = {
        role: 'BQAE',
        clientTeam: 'abcd',
        profilePhoto: 'https://profilephoto.com',
        eId: 'E0010',
        email: 'john@incubyte.co',
        roles: Role.Employee,
      };

      const mockUpdatedUser = {
        email: userDTO.email,
        password: userDTO.password,
        id: '1',
        createdAt: Date.prototype,
        profilePhoto: 'https://profilephoto.com',
        updatedAt: Date.prototype,
        eId: 'E0001',
        role: 'BQAE',
        clientTeam: 'abcd',
        roles: Role.Employee,
      };
      jest
        .spyOn(prismaService.user, 'findFirst')
        .mockResolvedValueOnce(mockUpdatedUser);

      jest
        .spyOn(prismaService.user, 'update')
        .mockResolvedValueOnce(mockUpdatedUser);
      const result = await service.updateUser(updateProfileBody, '1');
      expect(prismaService.user.update).toBeCalledTimes(1);

      expect(result).toEqual(mockUpdatedUser);
    });
    it('should delete user', async () => {
      const mockResponse = {
        email: userDTO.email,
        password: userDTO.password,
        id: '1',
        createdAt: Date.prototype,
        profilePhoto: 'https://profilephoto.com',
        updatedAt: Date.prototype,
        eId: 'E0001',
        role: 'BQAE',
        clientTeam: 'abcd',
        roles: Role.Employee,
      };
      jest
        .spyOn(prismaService.user, 'findFirst')
        .mockResolvedValueOnce(mockResponse);

      jest
        .spyOn(prismaService.user, 'delete')
        .mockResolvedValueOnce(mockResponse);
      const result = await service.deleteUser('1');
      expect(prismaService.user.delete).toBeCalledTimes(1);

      expect(result).toEqual(mockResponse);
    });

    it('should return all user', async () => {
      const mockResponse = [
        {
          email: userDTO.email,
          password: userDTO.password,
          id: '1',
          createdAt: Date.prototype,
          profilePhoto: 'https://profilephoto.com',
          updatedAt: Date.prototype,
          eId: 'E0001',
          role: 'BQA',
          clientTeam: 'abc',
          roles: Role.Employee,
        },
      ];

      jest
        .spyOn(prismaService.user, 'findMany')
        .mockResolvedValue(mockResponse);
      const result = await service.getAll();
      expect(prismaService.user.findMany).toBeCalledTimes(1);
      expect(result).toMatchObject(mockResponse);
    });
  });
});
