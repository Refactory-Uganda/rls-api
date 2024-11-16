/* eslint-disable prettier/prettier */
// src/course/course.service.ts
import { Injectable, HttpException, HttpStatus, BadRequestException, NotFoundException } from '@nestjs/common';
import { promises as fs } from 'fs';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Prisma } from '@prisma/client';
import { join } from 'path';
import { ImageService } from './images.service';

@Injectable()
export class CourseService {
	// update(arg0: string, updateDto: { Title: string; Description: string; Duration: string; status: "PUBLISHED"; topics: { id: string; Title: string; Description: string; lessons: { id: string; title: string; text: string; }[]; }[]; }) {
	//     throw new Error('Method not implemented.');
	// }

	private transformToArray(value: any): string[] {
		if (Array.isArray(value)) {
			return value;
		}
		if (typeof value === 'string') {
			//  handle both form data and comma-separated strings
			if (value.startsWith('[') && value.endsWith(']')) {
				try {
					return JSON.parse(value);
				} catch (error) {
					console.error('Error parsing JSON string:', error);
					// handle invalid JSON string
					return value.split(',').map((item) => item.trim());
				}
			}
			return value.split(',').map(item => item.trim()).filter(item => item.length > 0);
		}
		return [];
	}

	constructor(
		private prisma: PrismaService,
		private imageService:ImageService

	) { }

	async createCourseDraft(dto: CreateCourseDto) {
		try {

			const staffFacilitator = await this.prisma.user.findMany({
				where: {
					userGroup: 'Staff',
				},
				select: {
					id: true,
					firstName: true,
					lastName: true,
					email: true,
				},
			});

			if (dto.facilitator && !staffFacilitator.some((user) => user.id === dto.facilitator)) {
				throw new BadRequestException('Invalid facilitator ID');
			}

			// check for topics
			const hasTopics = dto.topics && dto.topics.length > 0;

			// set to draft if no topics
			const status = hasTopics ? dto.status ?? `DRAFT` : `DRAFT`;

			// Validate each topic to ensure they have the required structure
			if (hasTopics) {
				dto.topics.forEach((topic, index) => {
					if (!topic.Title || typeof topic.Description !== 'string') {
						throw new Error(`Invalid topic at index ${index}: "name" is required and should be a string.`);
					}
					// Add more validation as needed, like checking `description`, etc.
				});
			}

			if (!dto.Title || dto.Title.trim() === '') {
				throw new BadRequestException('Course title is required');
			}
			console.log('creating course data:', JSON.stringify(dto, null, 2));


			let imageUrl = null;
			if (dto.image) {

				const imagePath = join(process.cwd(), 'uploads/courses', dto.image);
				try {
					await fs.access(imagePath);
					imageUrl = `/uploads/courses/${dto.image}`;
				} catch (error) {
					console.log('Error accessing image path:', error);
					throw new BadRequestException('Invalid image file');
				}
			}
		


			// Transform string Arrays if they come as coma-separated strings

		const courseOutline = this.transformToArray(dto.courseOutline);
		const courseObjective = this.transformToArray(dto.courseObjective);
		const requirements = this.transformToArray(dto.requirements);

		if (!Array.isArray(courseOutline)) {
			console.log('courseOutline:', courseOutline);
			throw new BadRequestException('courseOutline must be an array');
		}

		if (!Array.isArray(requirements)) {
			console.log('requirements:', requirements);
			throw new BadRequestException('requirements must be an array');
		}

		if (!Array.isArray(courseObjective)) {
			console.log('courseObjective:', courseObjective);
			throw new BadRequestException('courseObjective must be an array');
		}

		const createData = {
			Title: dto.Title,
			Description: dto.Description,
			Duration: dto.Duration,
			status,
			courseOutline,
			requirements,
			assessmentMode: dto.assessmentMode,
			award: dto.award,
			courseObjective,
			image: imageUrl,
			topics: { create: dto.topics },
		}

		// Add if facilitator is provided
		if (dto.facilitator && dto.facilitator.trim() !== '') {
			Object.assign(createData, { facilitatorId: dto.facilitator });
		}

		// Add if any topics exist
		if (hasTopics) {
			Object.assign(createData, { topics: { create: dto.topics } });
		}

		// If facilitator is provided, retrieve their details
        let facilitatorDetails = null;
        if (dto.facilitator) {
            const facilitator = await this.prisma.user.findUnique({
                where: { id: dto.facilitator },
                select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    email: true,
                },
            });

            if (facilitator) {
                facilitatorDetails = {
                    id: facilitator.id,
                    name: `${facilitator.firstName} ${facilitator.lastName}`,
                    email: facilitator.email,
                };
            }
        }

		const createdCourse = await this.prisma.course.create({
			data: createData,
		});

		return {
			courses: {
				...createdCourse,
				facilitator: facilitatorDetails
		}
		}
	} catch(error) {
		if (error instanceof Prisma.PrismaClientKnownRequestError) {
			if (error instanceof Prisma.PrismaClientKnownRequestError) {
				switch (error.code) {
					case 'P2002':
						throw new Error('Unique constraint violation: A course with this title already exists.');
					case 'P2003':
						throw new Error('Foreign key constraint failed.');
					case 'P2005':
						throw new Error('Invalid topics Format.');
					case 'P2016':
						throw new Error('Input the correct datatype');
					case 'P2004':
						throw new Error('Fill the non nullable fields');
					case 'P2008':
						throw new Error('Please connect to a database');
					case 'P2012':
						throw new Error('A required value is missing');
					default:
						throw new Error(`Database error: ${error.message}`);
				}
			}
		}
		// if (error instanceof) {}
		if(dto.image){
			try{
				await this.imageService.deleteImage(dto.image);
			}catch(cleanupError){
				console.error('Error Cleaning up Image:', cleanupError);
			}
		}
		throw error;
	}}


	// publish course
	async publishCourse(id: string) {
		// check for topis
		const course = await this.prisma.course.findUnique({
			where: { id },
			include: { topics: true }
		});

		if (!course.topics || course.topics.length === 0) {
			throw new HttpException(
				{
					status: HttpStatus.BAD_REQUEST,
					message: 'Cannot publish a course without topics',
				},
				HttpStatus.BAD_REQUEST,
			);
		}

		return await this.prisma.course.update({
			where: { id },
			data: {
				status: `PUBLISHED`,
			},
		});
	}

	// make a course draft
	async draftCourse(id: string) {
		return await this.prisma.course.update({
			where: { id },
			data: {
				status: `DRAFT`,
			},
		});
	}

	// async updateCourse(id: string, updateCourseDto: UpdateCourseDto) {
	// 	try {

	// const staffFacilitator = await this.prisma.user.findMany({
	// 	where: {
	// 		userGroup: 'Staff',
	// 	},
	// 	select: {
	// 		id: true,
	// 		firstName: true,
	// 		lastName: true,
	// 		email: true,
	// 	},
	// });

	// 		if (updateCourseDto.facilitator && !staffFacilitator.some((user) => user.id === updateCourseDto.facilitator)) {
	// 			throw new BadRequestException('Invalid facilitator ID');
	// 		}

	// 		const imageUrl = updateCourseDto.image ? `/uploads/courses/${updateCourseDto.image}` : null;

	// 		return await this.prisma.course.update({
	// 			where: { id },
	// 			data: {
	// 				Title: updateCourseDto.Title,
	// 				Description: updateCourseDto.Description,
	// 				Duration: updateCourseDto.Duration,
	// 				status: updateCourseDto.status,
	// 				facilitatorId: updateCourseDto.facilitator,
	// 				courseOutline: updateCourseDto.courseOutline,
	// 				courseObjective: updateCourseDto.courseObjective,
	// 				requirements: updateCourseDto.requirements,
	// 				award: updateCourseDto.award,
	// 				assessmentMode: updateCourseDto.assessmentMode,
	// 				image: imageUrl,
	// 				topics: {
	// 					update: updateCourseDto.topics?.map((topic) => ({
	// 						where: { id: topic.id },
	// 						data: {
	// 							Title: topic.Title,
	// 							Description: topic.Description,
	// 						},
	// 					})),
	// 				},
	// 			},
	// 		});
	// 	} catch (error) {
	// 		throw new HttpException(
	// 			{
	// 				status: HttpStatus.BAD_REQUEST,
	// 				message: 'Failed to update course',
	// 				error: error.message,
	// 			},
	// 			HttpStatus.BAD_REQUEST,
	// 		);
	// 	}
	// }

	async patchCourse(id: string, partialUpdateDto: UpdateCourseDto) {
		try {

			const updateData: any = {};

			// Handle basic fields with proper casing
			if ('Title' in partialUpdateDto) {
				updateData.Title = partialUpdateDto.Title;
			}
			if ('Description' in partialUpdateDto) {
				updateData.Description = partialUpdateDto.Description;
			}
			if ('Duration' in partialUpdateDto) {
				updateData.Duration = partialUpdateDto.Duration;
			}
			if ('status' in partialUpdateDto) {
				updateData.status = partialUpdateDto.status;
			}
			if ('award' in partialUpdateDto) {
				updateData.award = partialUpdateDto.award;
			}
			if ('assessmentMode' in partialUpdateDto) {
				updateData.assessmentMode = partialUpdateDto.assessmentMode;
			}

			// Handle arrays by converting comma-separated strings if needed
			if ('courseOutline' in partialUpdateDto) {
				const outline: string | string[] = partialUpdateDto.courseOutline;
				updateData.courseOutline = Array.isArray(outline)
					? outline
					: (outline as string).split(',').map(item => item.trim());
			}

			if ('requirements' in partialUpdateDto) {
				const reqs: string | string[] = partialUpdateDto.requirements;
				updateData.requirements = Array.isArray(reqs)
					? reqs
					: (reqs as string).split(',').map(item => item.trim());
			}

			if ('courseObjective' in partialUpdateDto) {
				const objectives: string | string[] = partialUpdateDto.courseObjective;
				updateData.courseObjective = Array.isArray(objectives)
					? objectives
					: (objectives as string).split(',').map(item => item.trim());
			}

			// Handle facilitator
			if ('facilitator' in partialUpdateDto) {
				if (partialUpdateDto.facilitator && partialUpdateDto.facilitator.trim() !== '') {
					const staffFacilitator = await this.prisma.user.findMany({
						where: {
							userGroup: 'Staff',
						},
						select: {
							id: true,
						},
					});

					if (!staffFacilitator.some((user) => user.id === partialUpdateDto.facilitator)) {
						throw new BadRequestException('Invalid facilitator ID');
					}
					updateData.facilitatorId = partialUpdateDto.facilitator;
				} else {
					updateData.facilitatorId = null;
				}
			}

			// Handle image upload
			if ('image' in partialUpdateDto && partialUpdateDto.image) {
				const filename = partialUpdateDto.image;
				const timestamp = Date.now();
				const uniqueFilename = `${timestamp}-${Math.floor(Math.random() * 1000000000)}${filename}`;
				updateData.image = `/uploads/courses/${uniqueFilename}`;
			}

			// Validate the data before update
			const existingCourse = await this.prisma.course.findUnique({
				where: { id },
			});

			if (!existingCourse) {
				throw new NotFoundException(`Course with ID ${id} not found`);
			}

			// Perform the update
			const updatedCourse = await this.prisma.course.update({
				where: { id },
				data: updateData,
				include: {
					topics: true, // Include related topics if needed
				},
			});

			return updatedCourse;

		} catch (error) {
			throw new HttpException(
				{
					status: HttpStatus.BAD_REQUEST,
					message: 'Failed to partially update course',
					error: error.message,
				},
				HttpStatus.BAD_REQUEST,
			);
		}
	}


	async findAll(
		// page: number = 1, limit: number = 2
	) {
		try {
			// const skip = (page - 1) * limit;
			const courses = await this.prisma.course.findMany({
				// skip,
				// take: Number(limit),
				include: {
					topics: {
						include: { Lesson: true }
					}
				}
			});

			// const totalCourses = await this.prisma.course.count();

			return {
				courses,
				// total: totalCourses,
				// page,
				// limit,
				// totalPages: Math.ceil(totalCourses / limit),
			};
		} catch (error) {
			throw new Error(`Error fetching courses: ${error.message}`);
		}
	}

	// Method to fetch a single course by ID
	async findOne(id: string) {
		try {
			return await this.prisma.course.findUnique({
				where: { id: id },
				include: {
					topics: {
						include: { Lesson: true }
					}
				}

			});
		} catch (error) {
			throw new Error(`Error fetching course with ID ${id}: ${error.message}`);
		}
	}

	async deleteCourse(id: string) {
		try {
			return await this.prisma.course.delete({
				where: { id: id },
			});
		} catch (error) {
			throw new Error(`Error deleting course with ID ${id}: ${error.message}`);
		}
	}


	async staffFacilitator() {

		const staff = await this.prisma.user.findMany({
			where: {
				userGroup: 'Staff',
			},
			select: {
				id: true,
				firstName: true,
				lastName: true,
				email: true,
			},
		});

		return staff
	}

	async getStaffById(staffId: string) {
		// Remove extra quotes and whitespace
		const cleanedStaffId = staffId.replace(/['" ]/g, '');

		// Check if the cleaned staffId is a valid ObjectID (if using MongoDB or similar)
		const isValidObjectId = /^[a-fA-F0-9]{24}$/.test(cleanedStaffId);

		if (!isValidObjectId) {
			throw new BadRequestException('Invalid staff ID format');
		}


		try {
			return await this.prisma.user.findUnique({
				where: { id: cleanedStaffId }, // Pass the cleaned staffId
				select:{
					id: true,
					firstName: true,
					lastName: true,
					email: true,
					Course: {
						select: {
							Title: true,
							Description: true
						}
					}
				},
			});
		} catch (error) {
			throw new HttpException(
				{
					status: HttpStatus.INTERNAL_SERVER_ERROR,
					message: `Error finding staff by ID: ${error.message}`,
				},
				HttpStatus.INTERNAL_SERVER_ERROR,
			);
		}
	}

}
