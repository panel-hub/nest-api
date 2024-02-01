import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { DRoles } from '../decorator/roles.decorator';
import { IS_PUBLIC_KEY } from 'src/decorator/public.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean {
        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (isPublic) return true;

        const roles = this.reflector.get(DRoles, context.getHandler());
        if (!roles) return true;

        const request = context.switchToHttp().getRequest();
        const user = request.user;

        const status = this.matchRoles(roles ?? [], user?.roles ?? []);
        if (!status) throw new  UnauthorizedException()

        return true
    }

    matchRoles(roles: string[], uRoles: string[]): boolean {
        if (roles.includes('*')) {
            for (const role of roles) {
                if (!['*', ''].includes(role)) {
                    const status = uRoles.includes(role)
                    if (status) { return true };
                }
            }
            return false;
        } else {
            for (const role of roles) {
                if (!['*', ''].includes(role)) {
                    const tStatus = uRoles.includes(role)
                    if (!tStatus) { return false }
                }
            }
            return true
        }
    }
}
