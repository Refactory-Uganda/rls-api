import { Body, Controller, Get, Param, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { AssignmentSubmissionService } from "./submission.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiBody, ApiConsumes, ApiTags } from "@nestjs/swagger";
import { GradeSubmissionDto, SubmitAssignmentDto } from "./dto/submit-assignment.dto";

@ApiTags('Assignment-Submission')
@Controller()
export class AssignmentSubmissionController {
    constructor(
        private readonly assignmentSubmissionService: AssignmentSubmissionService
    ) {}

    @Post('submit')
    @UseInterceptors(FileInterceptor('answerUpload'))
    @ApiConsumes('multipart/form-data')
    async submitAssignment(
        @Body() submitAssignmentDto: SubmitAssignmentDto,
        @UploadedFile() file: Express.Multer.File
    ) {
        return this.assignmentSubmissionService.submitAssignment(
            submitAssignmentDto,
            file
        )
    }

    @Get(':assignment_id')
    async getSubmissions(@Param('assignment_id') assignmentId: string) {
        return this.assignmentSubmissionService.getSubmissions(assignmentId);
    }

    @Get('submission/:assignment_id')
    async getUserSubmission(@Param('assignment_id') assignmentId: string) {
        return this.assignmentSubmissionService.getUserSubmission(assignmentId);
    }

    
    // @ApiBody({
    //     description: 'The grade to asign to the work submitted',
    //     type: Object,
    //     schema: {
    //         properties: {
    //             grade: {
    //                 type: 'number',
    //                 description: 'The grade to asign to the work submitted'
    //             }
    //         }
    //     }
    // })

    @Post('grade/:submission_id')
    async gradeSubmission(@Param('submission_id') submissionId: string, 
    @Body() gradeSubmissionDto: GradeSubmissionDto ) {
        const { grade } = gradeSubmissionDto;
        return this.assignmentSubmissionService.gradeSubmission(submissionId, gradeSubmissionDto);
    }







}