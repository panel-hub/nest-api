import { createParamDecorator, ExecutionContext, InternalServerErrorException } from '@nestjs/common';
import { IModelNames } from './connection.decorator';

export const DModel = createParamDecorator(
    (data: IModelNames, ctx: ExecutionContext) => {
        try {
            const request = ctx.switchToHttp().getRequest();
            return request.models[data]
        } catch (error) {
            throw new InternalServerErrorException(`${data} model not`)
        }
    },
);
