// /* eslint-disable prettier/prettier */
// import { Controller, Get, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
// import { ContentService } from './content.service';
// // import { title } from 'process';
// import { FileInterceptor } from '@nestjs/platform-express';
// import { extname } from 'path';
// import { diskStorage } from 'multer';

// @Controller('course/:courseId/modules/:moduleId/content')
// export class ContentController {
//     constructor(private readonly contentService: ContentService) { }

//     @Post()
//     @UseInterceptors(
//         FileInterceptor('file', {
//             storage: diskStorage({
//                 destination: './uploads',
//                 filename: (req, file, callback) => {
//                     const randomName = Array(32)
//                         .fill(null)
//                         .map(() => Math.round(Math.random() * 16).toString(16))
//                         .join('');
//                     return callback(null, `${randomName}${extname(file.originalname)}`);
//                 },
//             }),
//         })
//     )

//     async uploadContent(@Param('moduleId') moduleId: string, @UploadedFile() file: Express.Multer.File) {
//         const fileUrl = `${process.env.APP_URL}/uplaods/${file.filename}`;
//         const name = file.originalname;
//         return this.contentService.uploadContent(moduleId, name, fileUrl);
//     }

//     @Get()
//     async getContent(@Param('moduleId') moduleId: string) {
//         return this.contentService.findAll(moduleId);
//     }
// }
