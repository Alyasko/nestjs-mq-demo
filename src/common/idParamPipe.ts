import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";

@Injectable()
export class IdParamPipe implements PipeTransform<string, string> {
    transform(value: string, metadata: ArgumentMetadata) {
        if (value.trim() === "") {
            throw new BadRequestException('ID should not be empty.');
        } else if (value.length !== 36) {
            throw new BadRequestException('ID should be a valid GUID.');
        }

        return value;
    }
}