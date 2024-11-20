import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, Slide } from '@prisma/client';
import { CreateSlideDto } from './dto/create-slide.dto';
import { UpdateSlideDto } from './dto/update-slide.dto';

@Injectable()
export class SlideService {
  constructor(private prisma: PrismaService) {}

  // Helper method to check if a lesson exists
  private async checkLessonExists(lessonId: string): Promise<void> {
    const lesson = await this.prisma.lesson.findUnique({
      where: { id: lessonId },
    });
    if (!lesson) {
      throw new NotFoundException(`Lesson with ID '${lessonId}' not found.`);
    }
  }

  // Create a new slide
  async create(createSlideDto: CreateSlideDto): Promise<Slide> {
    await this.checkLessonExists(createSlideDto.lessonId);
    return this.prisma.slide.create({
      data: createSlideDto,
    });
  }

  // Get all slides for a specific lesson
  async findAllByLesson(lessonId: string): Promise<Slide[]> {
    await this.checkLessonExists(lessonId);
    return this.prisma.slide.findMany({
      where: { lessonId },
    });
  }

  // Get a single slide by ID
  async findOne(id: string): Promise<Slide> {
    const slide = await this.prisma.slide.findUnique({
      where: { id },
    });
    if (!slide) {
      throw new NotFoundException(`Slide with ID '${id}' not found.`);
    }
    return slide;
  }

  // Update a slide by ID
  async update(id: string, updateSlideDto: UpdateSlideDto): Promise<Slide> {
    const slide = await this.prisma.slide.findUnique({
      where: { id },
    });
    if (!slide) {
      throw new NotFoundException(`Slide with ID '${id}' not found.`);
    }
    return this.prisma.slide.update({
      where: { id },
      data: updateSlideDto,
    });
  }

  // Delete a slide by ID
  async delete(id: string): Promise<Slide> {
    const slide = await this.prisma.slide.findUnique({
      where: { id },
    });
    if (!slide) {
      throw new NotFoundException(`Slide with ID '${id}' not found.`);
    }
    return this.prisma.slide.delete({
      where: { id },
    });
  }
}
