@Injectable()
export class TopicService {
  constructor(private prisma: PrismaService) {}

  async create(data: { Title: string; Description?: string; courseId: string }): Promise<Topic> {
    return this.prisma.topic.create({
      data: {
        Title: data.Title,
        Description: data.Description,
        courseId: data.courseId,
      },
      include: { Course: true },
    });
  }

  async updateTopic(id: string, updateTopicDto: UpdateTopicDto) {
    try {
      return await this.prisma.topic.update({
        where: { id },
        data: updateTopicDto,
      });
    } catch (error) {
      throw new Error(`Error updating topic with ID ${id}: ${error.message}`);
    }
  }

  async patchTopic(id: string, partialUpdateDto: Partial<UpdateTopicDto>) {
    try {
      return await this.prisma.topic.update({
        where: { id },
        data: partialUpdateDto,
      });
    } catch (error) {
      throw new Error(`Error partially updating topic with ID ${id}: ${error.message}`);
    }
  }

  deleteTopic(id: string) {
    return this.prisma.topic.delete({
      where: { id },
      include: { Course: true },
    });
  }

  // This method should be INSIDE the class body
  async findAllTopicsByCourse(courseId: string) {
    return this.prisma.topic.findMany({
      where: { courseId },
    });
  }
}
