import { UserDto } from '@Auth/dto/user.dto';
import { UpdateUserDto } from '@User/dto/updateUser.dto';
import { UserController } from '@User/user.controller';
import { UserService } from '@User/user.service';
import { Test, TestingModule } from '@nestjs/testing';
import { mock } from 'jest-mock-extended';

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: mock<UserService>(),
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('User Controller', () => {
    const userDTO: UserDto = {
      email: 'john@incubyte.co',
      password: '1234',
    };

    const userDecorator = {
      id: '1',
      email: userDTO.email,
    };

    it('should return the user by specified id', async () => {
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
      };

      jest.spyOn(service, 'getUserById').mockResolvedValue(mockResponse);
      const result = await controller.getUserById(userDecorator);
      expect(service.getUserById).toBeCalledTimes(1);
      expect(result).toMatchObject(mockResponse);
    });

    it('should return the course of the specific user', async () => {
      const mockResponse = {
        courses: [
          {
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
          },
        ],
        count: 2,
      };
      jest.spyOn(service, 'getCourseByUserId').mockResolvedValue(mockResponse);
      const result = await controller.getCourseByUserId(userDecorator, '');
      expect(service.getCourseByUserId).toHaveBeenCalledWith('1', '');
      expect(result).toEqual(mockResponse);
    });

    it('should return the active course of the specific user', async () => {
      const mockResponse = {
        courses: [
          {
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
          },
        ],
        count: 2,
      };
      jest.spyOn(service, 'getCourseByUserId').mockResolvedValue(mockResponse);
      const result = await controller.getCourseByUserId(
        userDecorator,
        'active',
      );
      expect(service.getCourseByUserId).toHaveBeenCalledWith('1', 'active');
      expect(result).toEqual(mockResponse);
    });

    it('should update the user profile', async () => {
      const updateProfileBody: UpdateUserDto = {
        role: 'BQAE',
        clientTeam: 'abcd',
        profilePhoto: 'https://profilephoto.com',
      };

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
      };

      jest.spyOn(service, 'updateProfile').mockResolvedValue(mockResponse);
      const result = await controller.updateProfile(
        userDecorator,
        updateProfileBody,
      );
      expect(service.updateProfile).toHaveBeenCalledWith(
        updateProfileBody,
        '1',
      );
      expect(result).toEqual(mockResponse);
    });
  });
});
