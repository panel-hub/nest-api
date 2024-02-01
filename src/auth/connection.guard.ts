import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, InternalServerErrorException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { DRoles } from '../decorator/roles.decorator';
import { IS_PUBLIC_KEY } from 'src/decorator/public.decorator';
import { Connection } from 'mongoose';
import { InjectConnection } from '@nestjs/mongoose';
import { Dconnection, IModelNames } from 'src/decorator/connection.decorator';
import { Product, ProductSchema } from 'src/schema/product.schema';

@Injectable()
export class ConnectionGuard implements CanActivate {
    constructor(private reflector: Reflector, @InjectConnection() private connection: Connection) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (isPublic) return true;

        const request = context.switchToHttp().getRequest();
        const user = request.user;

        const modelsName = this.reflector.get(Dconnection, context.getHandler());
        if (!modelsName.length) return true;

        // Get Connection
        const connection = await this.connection.useDb(user.sub)
        const models = {}
        for (const mn of modelsName) {
            models[mn] = this.getModels(mn, connection)
        }
        request.models = models

        return true
    }

    getModels(modelName: IModelNames, connection: Connection) {
        switch(modelName) {
            case 'Products':
                return connection.model(Product.name, ProductSchema, Product.name)
            default:
                throw new InternalServerErrorException(`${modelName} schema not found`)
        }
    }
}
