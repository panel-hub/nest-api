import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User as IUser } from 'src/schema/user.schema';


export const DUser = createParamDecorator(
    (data: string, ctx: ExecutionContext): IUser => {
        const request = ctx.switchToHttp().getRequest();
        const { roles, ...user } = request?.user
        return data ? user[data] : user
    },
);
