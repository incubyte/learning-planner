import { Test, TestingModule } from '@nestjs/testing';
import { mock } from 'jest-mock-extended';
import { TagDto } from '@Tag/dto/tag.dto';
import { TagController } from '@Tag/tag.controller';
import { TagService } from '@Tag/tag.service';

describe('TagController', () => {
  let controller: TagController;
  let service: TagService;

  beforeAll(async () => {
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
    const mockResponse: any = [];
    mockResponse.push({
      id: '1',
      name: tags[0].name,
    });
    jest.spyOn(service, 'getById').mockResolvedValueOnce(mockResponse);
    const result = await controller.getById('1');
    expect(service.getById).toBeCalledTimes(1);
    expect(result).toMatchObject(mockResponse);
  });

  it('should create tags', async () => {
    const tags: TagDto = {
      name: 'clean-code',
    };
    const mockResponse = {
      id: 1,
      name: 'clean-code',
    };
    jest.spyOn(service, 'createTag').mockResolvedValueOnce(mockResponse);
    const result = await controller.create(tags);
    expect(service.createTag).toBeCalledTimes(1);
    expect(result).toMatchObject(mockResponse);
  });

  it('should update user', async () => {
    const tags: TagDto = {
      name: 'clean-code',
    };
    const mockResponse = {
      id: 1,
      name: 'clean-code',
    };

    jest.spyOn(service, 'updateTag').mockResolvedValueOnce(mockResponse);
    const result = await controller.updateTag('1', tags);
    expect(service.updateTag).toHaveBeenCalledWith(1, tags);
    expect(service.updateTag).toHaveBeenCalledTimes(1);
    expect(result).toEqual(mockResponse);
  });

  it('should delete course', async () => {
    const response = 'Tag is deleted Successfully';
    jest.spyOn(service, 'deleteTag').mockResolvedValueOnce(response);
    const result = await controller.deleteTag('1');
    expect(service.deleteTag).toHaveBeenCalledWith(1);
    expect(service.deleteTag).toHaveBeenCalledTimes(1);
    expect(result).toEqual('Tag is deleted Successfully');
  });
});
