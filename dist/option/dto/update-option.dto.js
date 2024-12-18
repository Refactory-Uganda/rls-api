"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateOptionDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const option_dto_1 = require("./option.dto");
class UpdateOptionDto extends (0, swagger_1.PartialType)(option_dto_1.CreateOptionDto) {
}
exports.UpdateOptionDto = UpdateOptionDto;
//# sourceMappingURL=update-option.dto.js.map