import { AuthController } from '@Auth/auth.controller';
import { AuthService } from '@Auth/auth.service';
import { UserDto } from '@Auth/dto/user.dto';
import { Test, TestingModule } from '@nestjs/testing';
import { mock } from 'jest-mock-extended';
import { Role } from './role.enum';
describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;

  beforeAll(async () => {
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

  afterEach(() => {
    jest.clearAllMocks();
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
      eId: 'E0001',
      role: 'BQA',
      clientTeam: 'abc',
      roles: Role.Employee,
      projectTeam: 'abc',
      firstName:"ABC",
      lastName:"XYZ",
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

  it('should be able to return the token for logged in admin', async () => {
    const user: UserDto = {
      email: 'john@incubyte.co',
      password: '123',
    };
    jest
      .spyOn(service, 'signinAdmin')
      .mockResolvedValueOnce(
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjgzYjdlNjQ5LTFlMzctNDNiZS04MjI5LTAyYWIwNmM5YmE5YSIsImVtYWlsIjoiam9obkBpbmN1Ynl0ZS5jbyJ9.6P194HePv2AaSgB1jvyb_lM5EOKyMMu0cWkx_p0O2cc',
      );
    const result = await controller.signinAdmin(user);
    expect(service.signinAdmin).toBeCalledTimes(1);
    expect(result).toBe(
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjgzYjdlNjQ5LTFlMzctNDNiZS04MjI5LTAyYWIwNmM5YmE5YSIsImVtYWlsIjoiam9obkBpbmN1Ynl0ZS5jbyJ9.6P194HePv2AaSgB1jvyb_lM5EOKyMMu0cWkx_p0O2cc',
    );
  });

  it('should be able to return the response', async () => {
    jest
      .spyOn(service, 'forgotPasswordAdmin')
      .mockResolvedValueOnce('email sent');
    const result = await controller.forgotPasswordAdmin('john@incubyte.co');
    expect(service.forgotPasswordAdmin).toBeCalledTimes(1);
    expect(result).toBe('email sent');
  });

  it('should be able to change the password', async () => {
    jest
      .spyOn(service, 'resetPassword')
      .mockResolvedValueOnce('password changed');
    const result = await controller.resetPassword('1', '123');
    expect(service.resetPassword).toBeCalledTimes(1);
    expect(result).toBe('password changed');
  });

  it('should be able to return the response', async () => {
    jest.spyOn(service, 'forgotPassword').mockResolvedValueOnce('email sent');
    const result = await controller.forgotPassword('john@incubyte.co');
    expect(service.forgotPassword).toBeCalledTimes(1);
    expect(result).toBe('email sent');
  });
});
