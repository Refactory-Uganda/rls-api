"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FacilitatorService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("axios");
const prisma_service_1 = require("../prisma/prisma.service");
const client_1 = require("@prisma/client");
let FacilitatorService = class FacilitatorService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getFacilitatorById(externalId) {
        return await this.prisma.user.findUnique({
            where: {
                externalId,
            }
        });
    }
    async createFacilitator(createUser) {
        return await this.prisma.user.create({
            data: createUser
        });
    }
    async getStaffFromRims() {
        try {
            const reponse = await axios_1.default.get('https://rims-api-xufp.onrender.com/staff');
            const facilitators = reponse.data;
            for (const facilitator of facilitators) {
                const existingFacilitator = await this.getFacilitatorById(facilitator.id);
                if (!existingFacilitator) {
                    const newFacilitator = await this.createFacilitator({
                        externalId: facilitator.id,
                        email: facilitator.email.email,
                        firstName: facilitator.firstName,
                        lastName: facilitator.lastName,
                        userGroup: client_1.Groups.Staff,
                        nationality: facilitator.nationality || null,
                        residence: facilitator.residence || null,
                    });
                    console.log('user created: ', newFacilitator);
                }
            }
        }
        catch (error) {
            console.error('Error fetching staff from rims: ', error);
        }
    }
};
exports.FacilitatorService = FacilitatorService;
exports.FacilitatorService = FacilitatorService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], FacilitatorService);
//# sourceMappingURL=faculitator.service.js.map