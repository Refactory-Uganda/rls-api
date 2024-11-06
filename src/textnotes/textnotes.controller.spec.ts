// src/note/note.controller.spec.ts
/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { NoteController } from './textnotes.controller';
import { NoteService } from './textnotes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateTextnotesDto } from './dto/update-textnotes.dto';

const mockNote = {
  id: 'some_id',
  notesText: 'Some note text',
  textContentId: 'text_content_id',
};

const mockNoteService = {
  create: jest.fn().mockResolvedValue(mockNote),
  update: jest.fn().mockResolvedValue(mockNote),
  patchTextnotes: jest.fn().mockResolvedValue(mockNote),
  remove: jest.fn().mockResolvedValue(mockNote),
};

describe('NoteController', () => {
  let controller: NoteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NoteController],
      providers: [
        { provide: NoteService, useValue: mockNoteService },
      ],
    }).compile();

    controller = module.get<NoteController>(NoteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new note', async () => {
      const createNoteDto: CreateNoteDto = { notesText: 'Some note text', textContentId: 'text_content_id' };
      const result = await controller.create(createNoteDto);
      expect(result).toEqual(mockNote);
      expect(mockNoteService.create).toHaveBeenCalledWith(createNoteDto);
    });
  });

  describe('update', () => {
    it('should update a note', async () => {
      const updateNoteDto: UpdateTextnotesDto = { notesText: 'Updated note text' };
      const result = await controller.update(mockNote.id, updateNoteDto);
      expect(result).toEqual(mockNote);
      expect(mockNoteService.update).toHaveBeenCalledWith(mockNote.id, updateNoteDto);
    });
  });

  describe('remove', () => {
    it('should delete a note', async () => {
      const result = await controller.remove(mockNote.id);
      expect(result).toEqual(mockNote);
      expect(mockNoteService.remove).toHaveBeenCalledWith(mockNote.id);
    });
  });
});
