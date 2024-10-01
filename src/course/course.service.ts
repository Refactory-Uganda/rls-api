/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCourseDto } from './dto/createCourseDto';
import { UpdateCourseDto } from './dto/updateCourseDto';

@Injectable()
export class CourseService {
  constructor(private prisma: PrismaService) {} 

  async createCourse(createCourseDto: CreateCourseDto){
    try{
      await this.prisma.course.create({ 
      data: {
        courseTitle: createCourseDto.courseTitle,
        courseDescription: createCourseDto.courseDescription,
        courseDuration: createCourseDto.courseDuration,
  }});
  throw new HttpException(
    {
      status: HttpStatus.CREATED,
      message: `Course ${createCourseDto.courseTitle} created`,
    },
    HttpStatus.CREATED,
  );
}catch (error){
  throw error;
}
}
  async updateCourse(id: string,updateCourseDto: UpdateCourseDto) {
    try {
      await this.prisma.course.update({
        where: { id: id},
        data: {
          courseTitle: updateCourseDto.courseTitle,
          courseDescription: updateCourseDto.courseDescription,
          courseDuration: updateCourseDto.courseDuration,
        },
      });
      throw new HttpException(
        {
          status: HttpStatus.CREATED,
          message: `Course ${updateCourseDto.courseTitle} created`,
        },
        HttpStatus.CREATED,
      );
    }catch (error){
      throw error;
    }
  }

  async findAll() {
    return await this.prisma.course.findMany({}) ;
  }

  findOne(id: string) {
    return this.prisma.course.findUnique({
      where: {id:id},
    });
  }

  removeCourse(id: string) {
    return this.prisma.course.delete({
      where: {id:id},
    })
  }
}
