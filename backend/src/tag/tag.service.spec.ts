import { PrismaService } from '@/prisma/prisma.service';
import { Test, TestingModule } from '@nestjs/testing';
import { TagDto } from './dto/tag.dto';
import { TagService } from './tag.service';

describe('TagService', () => {
  let service: TagService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TagService,
        {
          provide: PrismaService,
          useFactory() {
            return {
              tag: {
                findMany: jest.fn(),
                findFirst: jest.fn(),
              },
            };
          },
        },
      ],
    }).compile();

    service = module.get<TagService>(TagService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all tags', async () => {
    const tags: TagDto[] = [
      {
        name: 'clean-code',
      },
      {
        name: 'refactoring',
      },
    ];
    const mockResponse = [];
    mockResponse.push(
      {
        id: '1',
        name: tags[0].name,
      },
      {
        id: '2',
        name: tags[1].name,
      },
    );

    jest.spyOn(prismaService.tag, 'findMany').mockResolvedValue(mockResponse);
    const result = await service.getAll();
    expect(prismaService.tag.findMany).toBeCalledTimes(1);
    expect(result).toMatchObject(mockResponse);
  });

  it('should return course by id which is provided', async () => {
    const tags: TagDto[] = [
      {
        name: 'clean-code',
      },
      {
        name: 'refactoring',
      },
    ];
    const mockResponse: any = [];
    mockResponse.push({
      id: '1',
      name: tags[0].name,
    });
    jest.spyOn(prismaService.tag, 'findFirst').mockResolvedValue(mockResponse);
    const result = await service.getById(1);
    expect(prismaService.tag.findFirst).toBeCalledTimes(1);
    expect(result).toMatchObject(mockResponse);
  });
});
