// src/note/textnotes.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { NoteService } from './textnotes.service';
import { PrismaService } from '../prisma/prisma.service'; // Assuming this is the correct path
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateTextnotesDto } from './dto/update-textnotes.dto';

const mockNote = {
  id: 'some_id',
  notesText: 'Some note text',
  textContentId: 'text_content_id',
};

const mockPrismaService = {
  note: {
    create: jest.fn().mockResolvedValue(mockNote),
    update: jest.fn().mockResolvedValue(mockNote),
    delete: jest.fn().mockResolvedValue(mockNote),
  },
};

describe('NoteService', () => {
  let service: NoteService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NoteService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<NoteService>(NoteService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new note', async () => {
      const createNoteDto: CreateNoteDto = { notesText: 'Some note text', textContentId: 'text_content_id' };
      const result = await service.create(createNoteDto);
      expect(result).toEqual(mockNote);
      expect(prisma.note.create).toHaveBeenCalledWith({
        data: createNoteDto,
      });
    });
  });

  describe('update', () => {
    it('should update a note', async () => {
      const updateNoteDto: UpdateTextnotesDto = { notesText: 'Updated note text' };
      const result = await service.update(mockNote.id, updateNoteDto);
      expect(result).toEqual(mockNote);
      expect(prisma.note.update).toHaveBeenCalledWith({
        where: { id: mockNote.id },
        data: updateNoteDto,
      });
    });
  });

  describe('remove', () => {
    it('should delete a note', async () => {
      const result = await service.remove(mockNote.id);
      expect(result).toEqual(mockNote);
      expect(prisma.note.delete).toHaveBeenCalledWith({ where: { id: mockNote.id } });
    });
  });
});
