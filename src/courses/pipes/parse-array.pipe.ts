import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";

@Injectable()
export class ParseArrayPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata) {
        if (metadata.type === 'body') {
          const keys = ['courseOutline', 'requirements', 'courseObjective'];
          keys.forEach(key => {
            if (value[key]) {
              try {
                value[key] = JSON.parse(value[key]);
              } catch (e) {
                throw new BadRequestException(`Invalid format for ${key}`);
              }
            }
          });
        }
        return value;
      }
}