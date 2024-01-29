import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User as IUser } from 'src/schema/user.schema';


export const DUser = createParamDecorator(
    (data: string, ctx: ExecutionContext): IUser => {
        const request = ctx.switchToHttp().getRequest();
        return data ? request?.user[data] : request?.user
    },
);
