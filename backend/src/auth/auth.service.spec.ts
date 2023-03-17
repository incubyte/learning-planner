import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { AuthService } from './auth.service';
import { UserDto } from './Dto/userDto';
import { BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

describe('AuthService', () => {
  let service: AuthService;
  let prismaService:PrismaService;
  let jwtService :JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: PrismaService,
          useFactory() {
            return {
              user: {
                create: jest.fn(),
                delete: jest.fn(),
                findFirst:jest.fn()
              },
            };
          },
        },
        {
          provide : JwtService,
          useFactory(){
            return{
              sign: jest.fn()
            }
          }
        },
      ],
    }).compile();
    service = module.get<AuthService>(AuthService);
    prismaService = module.get<PrismaService>(PrismaService);
    jwtService = module.get<JwtService>(JwtService);
  });

     afterAll(async () => {
       prismaService.user.delete({
         where: {
           email: 'john@incubyte.co',
         },
       });
     });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  

  describe('Signup',()=>{
    const userDTO: UserDto = {
      email: 'john@incubyte.co',
      password: '1234',
    };



    it('should be signup a User', async () => {
      jest.spyOn(prismaService.user, 'create').mockResolvedValue({
        ...userDTO,
        id: '1',
        createdAt: Date.prototype,
        profilePhoto: 'https://profilephoto.com',
        updatedAt: Date.prototype,
      });
      const result = await service.signup(userDTO);
      expect(prismaService.user.create).toBeCalledTimes(1);
      expect(prismaService.user.create).toHaveBeenCalledWith({
        data: {
          ...userDTO,
          profilePhoto: 'https://profilephoto.com',
        },
      });
      expect(result).toMatchObject({
        email: userDTO.email,
        id: '1',
        createdAt: Date.prototype,
        profilePhoto: 'https://profilephoto.com',
        updatedAt: Date.prototype,
      });
    });

    it('should return error message if email already exists ', async () => {
      jest.spyOn(prismaService.user, 'findFirst').mockResolvedValue({
        ...userDTO,
        id: '1',
        createdAt: Date.prototype,
        profilePhoto: 'https://profilephoto.com',
        updatedAt: Date.prototype,
      });

      expect(async () => await service.signup(userDTO)).rejects.toThrow(
        new BadRequestException('Email Already exists'),
      );
    });

    
  })


  describe('Signin',  () => {
   
     const userDTO: UserDto = {
       email: 'shreyas@incubyte.co',
       password: '1234',
     };
     it('should be able to return sign token for logged in user', async () => {

      jest.spyOn(prismaService.user, 'findFirst').mockResolvedValue({
        ...userDTO,
        id: '83b7e649-1e37-43be-8229-02ab06c9ba9a',
        createdAt: Date.prototype,
        profilePhoto: 'https://profilephoto.com',
        updatedAt: Date.prototype,
      });

       jest
         .spyOn(jwtService, 'sign')
         .mockReturnValueOnce(
           'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjgzYjdlNjQ5LTFlMzctNDNiZS04MjI5LTAyYWIwNmM5YmE5YSIsImVtYWlsIjoiam9obkBpbmN1Ynl0ZS5jbyJ9.6P194HePv2AaSgB1jvyb_lM5EOKyMMu0cWkx_p0O2cc',
         );

       const result = await service.signin(userDTO);
       expect(jwtService.sign).toBeCalledTimes(1);
       expect(jwtService.sign).toHaveBeenCalledWith({
         data: {
           id: '83b7e649-1e37-43be-8229-02ab06c9ba9a',
           email: userDTO.email,
         },
       });
       expect(result).toBe(
         'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjgzYjdlNjQ5LTFlMzctNDNiZS04MjI5LTAyYWIwNmM5YmE5YSIsImVtYWlsIjoiam9obkBpbmN1Ynl0ZS5jbyJ9.6P194HePv2AaSgB1jvyb_lM5EOKyMMu0cWkx_p0O2cc',
       );
     });
     
  });
  
});
