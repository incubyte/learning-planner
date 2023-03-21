import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserDto } from './dto/user.dto';

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useFactory() {
            return {
              signup: jest.fn(),
            };
          },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should be createBookmark', async () => {
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

    expect(result).toMatchObject({
      id: expect.any(String),
      createdAt: Date.prototype,
      profilePhoto: 'https://profilephoto.com',
      updatedAt: Date.prototype,
    });
  });
});
