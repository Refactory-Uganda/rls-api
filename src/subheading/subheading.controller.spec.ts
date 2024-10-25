// src/sub-heading/sub-heading.controller.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { SubHeadingController } from './subheading.controller';
import { SubHeadingService } from './subheading.service';
import { CreateSubHeadingDto } from './dto/create-sub-heading.dto';
import { UpdateSubheadingDto } from './dto/update-subheading.dto';

const mockSubHeading = {
  id: 'some_id',
  subText: 'Some subheading text',
  textContentId: 'text_content_id',
};

const mockSubHeadingService = {
  create: jest.fn().mockResolvedValue(mockSubHeading),
  updateSubheading: jest.fn().mockResolvedValue(mockSubHeading),
  patchTextContent: jest.fn().mockResolvedValue(mockSubHeading),
  remove: jest.fn().mockResolvedValue(mockSubHeading),
};

describe('SubHeadingController', () => {
  let controller: SubHeadingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SubHeadingController],
      providers: [
        { provide: SubHeadingService, useValue: mockSubHeadingService },
      ],
    }).compile();

    controller = module.get<SubHeadingController>(SubHeadingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new subheading', async () => {
      const createSubHeadingDto: CreateSubHeadingDto = { subText: 'Some subheading text', textContentId: 'text_content_id' };
      const result = await controller.create(createSubHeadingDto);
      expect(result).toEqual(mockSubHeading);
      expect(mockSubHeadingService.create).toHaveBeenCalledWith(createSubHeadingDto);
    });
  });

  describe('patch', () => {
    it('should partially update a subheading', async () => {
      const partialUpdateDto: Partial<UpdateSubheadingDto> = { subText: 'Partially updated text' };
      const result = await controller.patch(mockSubHeading.id, partialUpdateDto);
      expect(result).toEqual(mockSubHeading);
      expect(mockSubHeadingService.patchTextContent).toHaveBeenCalledWith(mockSubHeading.id, partialUpdateDto);
    });
});

  describe('patch', () => {
    it('should partially update a subheading', async () => {
      const partialUpdateDto: Partial<UpdateSubheadingDto> = { subText: 'Partially updated text' };
      const result = await controller.patch(mockSubHeading.id, partialUpdateDto);
      expect(result).toEqual(mockSubHeading);
      expect(mockSubHeadingService.patchTextContent).toHaveBeenCalledWith(mockSubHeading.id, partialUpdateDto);
    });
  });

  describe('remove', () => {
    it('should delete a subheading', async () => {
      const result = await controller.remove(mockSubHeading.id);
      expect(result).toEqual(mockSubHeading);
      expect(mockSubHeadingService.remove).toHaveBeenCalledWith(mockSubHeading.id);
    });
  });
});
