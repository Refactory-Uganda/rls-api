"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const axios_1 = require("@nestjs/axios");
const prisma_module_1 = require("./prisma/prisma.module");
const facilitator_module_1 = require("./facilitator/facilitator.module");
const mail_module_1 = require("./mail/mail.module");
const cohort_module_1 = require("./cohort/cohort.module");
const learner_module_1 = require("./learner/learner.module");
const modules_module_1 = require("./modules/modules.module");
const program_module_1 = require("./program/program.module");
const courses_module_1 = require("./courses/courses.module");
const topic_module_1 = require("./topic/topic.module");
const lesson_module_1 = require("./lesson/lesson.module");
const quiz_module_1 = require("./quiz/quiz.module");
const question_module_1 = require("./question/question.module");
const option_module_1 = require("./option/option.module");
const authentication_module_1 = require("./authentication/authentication.module");
const path_1 = require("path");
const serve_static_1 = require("@nestjs/serve-static");
const slide_module_1 = require("./slide/slide.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: (0, path_1.join)(__dirname, '..', 'uploads'),
                serveRoot: '/uploads',
            }),
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            axios_1.HttpModule,
            prisma_module_1.PrismaModule,
            modules_module_1.ModulesModule,
            facilitator_module_1.FacilitatorModule,
            mail_module_1.MailModule,
            cohort_module_1.CohortModule,
            learner_module_1.LearnerModule,
            program_module_1.ProgramModule,
            courses_module_1.CoursesModule,
            topic_module_1.TopicsModule,
            lesson_module_1.LessonModule,
            quiz_module_1.QuizModule,
            question_module_1.QuestionModule,
            option_module_1.OptionModule,
            authentication_module_1.AuthenticationModule,
            slide_module_1.SlideModule,
        ],
        controllers: [],
        providers: [],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map