import { Test, TestingModule } from '@nestjs/testing';
import { mock } from 'jest-mock-extended';
import { TagDto } from './dto/tag.dto';
import { TagController } from './tag.controller';
import { TagService } from './tag.service';

describe('TagController', () => {
  let controller: TagController;
  let service: TagService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TagController],
      providers: [
        {
          provide: TagService,
          useValue: mock<TagService>(),
        },
      ],
    }).compile();

    controller = module.get<TagController>(TagController);
    service = module.get<TagService>(TagService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return tags', async () => {
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
    jest.spyOn(service, 'getAll').mockResolvedValueOnce(mockResponse);
    const result = await controller.getAll();
    expect(service.getAll).toBeCalledTimes(1);
    expect(result).toMatchObject(mockResponse);
  });

  it('should return tag by id which is provided', async () => {
    const tags: TagDto[] = [
      {
        name: 'clean-code',
      },
      {
        name: 'refactoring',
      },
    ];
    const mockResponse = [];
    mockResponse.push({
      id: '1',
      name: tags[0].name,
    });
    jest.spyOn(service, 'getById').mockResolvedValueOnce(mockResponse);
    const result = await controller.getById(1);
    expect(service.getById).toBeCalledTimes(1);
    expect(result).toMatchObject(mockResponse);
  });
});
