import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { mock } from 'jest-mock-extended';
import { UserDto } from '@Auth/dto/user.dto';
import { UserService } from './user.service';

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;

  beforeEach(async () => {
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
  });
});
