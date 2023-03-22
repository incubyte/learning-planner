import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '@Auth/auth.controller';
import { AuthService } from '@Auth/auth.service';
import { mock } from 'jest-mock-extended';
import { UserDto } from './Dto/user.dto';
describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mock<AuthService>(),
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should be create user', async () => {
    const user: UserDto = {
      email: 'john@incubyte.co',
      password: '123',
    };
    jest.spyOn(service, 'signup').mockResolvedValueOnce({
      email: user.email,
      password: user.password,
      id: '1',
      profilePhoto: 'https://profilephoto.com',
      createdAt: Date.prototype,
      updatedAt: Date.prototype,
    });
    const result = await controller.signup(user);
    expect(service.signup).toBeCalledTimes(1);
    expect(service.signup).toBeCalledWith({
      email: 'john@incubyte.co',
      password: '123',
    });
    expect(result).toMatchObject({
      id: expect.any(String),
      createdAt: Date.prototype,
      profilePhoto: 'https://profilephoto.com',
      updatedAt: Date.prototype,
    });
  });

  it('should be able to return the token for logged in user', async () => {
    const user: UserDto = {
      email: 'john@incubyte.co',
      password: '123',
    };
    jest
      .spyOn(service, 'signin')
      .mockResolvedValueOnce(
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjgzYjdlNjQ5LTFlMzctNDNiZS04MjI5LTAyYWIwNmM5YmE5YSIsImVtYWlsIjoiam9obkBpbmN1Ynl0ZS5jbyJ9.6P194HePv2AaSgB1jvyb_lM5EOKyMMu0cWkx_p0O2cc',
      );
    const result = await controller.signin(user);
    expect(service.signin).toBeCalledTimes(1);
    expect(result).toBe(
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjgzYjdlNjQ5LTFlMzctNDNiZS04MjI5LTAyYWIwNmM5YmE5YSIsImVtYWlsIjoiam9obkBpbmN1Ynl0ZS5jbyJ9.6P194HePv2AaSgB1jvyb_lM5EOKyMMu0cWkx_p0O2cc',
    );
  });
});
